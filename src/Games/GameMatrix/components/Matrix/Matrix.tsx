import Board from '../Board/Board';
import cn from 'classnames';
import GameAbout from '../../../../components/GameAbout/GameAbout';
import GameStats from '../../../../components/GameStats/GameStats';
import HowToPlayMemoryMatrix from '../HowToPlayMemoryMatrix/HowToPlayMemoryMatrix';
import HowToPlayRotationMatrix from '../HowToPlayRotationMatrix/HowToPlayRotationMatrix';
import moveBgPath from '../../../../assets/sounds/matrixSounds/moveBg.mp3';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Results from '../../../../components/Results/Results';
import scoreApi from '../../../../shared/api/score';
import SoundButton from '../../../../components/SoundButton/SoundButton';
import StartGame from '../../../../components/StartGame/StartGame';
import { getEndOfWord } from '../../../../utils/endOfWord';
import { MatrixGameResult } from '../../../../shared/types/score';
import { useAppSelector } from '../../../../shared/hooks/store';
import { useTranslation } from 'react-i18next';
import './Matrix.scss';
import HowToPlayDone, {
  TypeConfirm,
} from '../../../../components/HowToPlayDone/HowToPlayDone';
import { getIsSound } from '../../../../utils/soundUtils';

const TILES_DEFAULT = 3;
const TRIAL_DEFAULT = 1;
const SCORE_DEFAULT = 0;

const BEST_BOARD_DEFAULT = 3;

const ADD_SCORE = 250;
const BONUS_MULTIPLIER = 100;

export enum MatrixGame {
  MemoryMatrix = 'MemoryMatrix',
  RotationMatrix = 'RotationMatrix',
}

type MatrixProps = {
  matrixGame: MatrixGame;
};

export default function Matrix({ matrixGame }: MatrixProps) {
  const isAuth = useAppSelector(state => state.user.isAuth);

  const { i18n, t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isTutorial, setIsTutorial] = useState(false);
  const [isHowToPlayDone, setIsHowToPlayDone] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const [tiles, setTiles] = useState(TILES_DEFAULT);
  const [trial, setTrial] = useState(TRIAL_DEFAULT);
  const [score, setScore] = useState(SCORE_DEFAULT);

  const [lastBoard, setLastBoard] = useState(TILES_DEFAULT);
  const [bestBoard, setBestBoard] = useState(BEST_BOARD_DEFAULT);
  const [tilesLeft, setTilesLeft] = useState(0);

  const [tutorialMessage, setTutorialMessage] = useState('');

  const [soundOn, setSoundOn] = useState(getIsSound());

  const isRotation = matrixGame === MatrixGame.RotationMatrix;

  const game = isRotation ? 'rotation-matrix' : 'memory-matrix';

  const moveBg = new Audio(moveBgPath);

  const canSound = useRef(true);

  const playSound = (soundPath: HTMLAudioElement) => {
    canSound.current && void soundPath.play();
  };

  useEffect(() => {
    canSound.current = soundOn;

    return () => {
      canSound.current = false;
    };
  }, [canSound.current, soundOn]);

  const getStats = async () => {
    const lastResult = await scoreApi.getUserLastResult(game);
    const matrixResult = lastResult.results as MatrixGameResult;

    setTiles(() => {
      if (matrixResult) {
        const possibleTiles = +matrixResult.lastBoard - 3;

        if (possibleTiles <= TILES_DEFAULT) {
          return TILES_DEFAULT;
        } else {
          return possibleTiles;
        }
      } else {
        return TILES_DEFAULT;
      }
    });
  };

  const initGame = async () => {
    setIsStarted(true);
    setIsGameEnd(false);
    setIsHowToPlayDone(false);
    setIsTutorial(false);
    await getStats();
    setTrial(() => TRIAL_DEFAULT);
    setScore(() => SCORE_DEFAULT);
  };

  const onHowToPlayHandler = () => {
    setIsTutorial(true);
    setTiles(() => 2);
    setIsStarted(true);
    setIsGameEnd(false);
  };

  const gameTitle = t(`${matrixGame}.title`);
  const gameDescription = t(`${matrixGame}.description`);
  const gameType = t(`${matrixGame}.type`);
  const gameAbout = t(`${matrixGame}.about`);
  const tutorialMessage1 = t(`${matrixGame}.howToPlay.message1`);
  const tutorialMessage2 = t(`${matrixGame}.howToPlay.message2`);

  function addScore() {
    setScore(prev => prev + ADD_SCORE);
  }

  function addBonusScore() {
    setScore(prev => prev + tiles * BONUS_MULTIPLIER);
  }

  function endTutorial() {
    setIsStarted(true);
    setIsHowToPlayDone(true);
  }

  function refreshBestBoard() {
    if (tiles > bestBoard) {
      setBestBoard(tiles);
    }
  }

  function gameMessage(tapsDone: number, tapsSuccess: number) {
    if (tapsDone === tapsSuccess) {
      setTilesLeft(() => 0);
      return;
    } else if (tapsDone < tiles && tapsDone > 0) {
      setTilesLeft(() => tiles - tapsDone);
    } else {
      setTilesLeft(() => 0);
    }
  }

  function tutorMessage(levelState: string) {
    isTutorial && setTutorialMessage(levelState);
  }

  async function onRetryHandler() {
    await initGame();
  }

  const saveResults = useCallback(() => {
    const results = {
      score,
      lastBoard,
    };

    try {
      void scoreApi.saveResults<MatrixGameResult>(
        isRotation ? 'rotation-matrix' : 'memory-matrix',
        results
      );
    } catch (e) {
      const err = e as Error;
      setErrorMessage(err.message);
    }
  }, [score, lastBoard, isRotation]);

  useEffect(() => {
    if (isGameEnd && isAuth) saveResults();
  }, [isGameEnd, isAuth, saveResults]);

  useEffect(() => {
    if (isStarted) {
      playSound(moveBg);
    }
  }, [isStarted]);

  return (
    <>
      <div className="matrix__about">
        {isStarted && (
          <GameAbout title={gameTitle} type={gameType} about={gameAbout} />
        )}
      </div>
      <div className="matrix">
        <SoundButton setSoundOn={setSoundOn} />
        {!isStarted && !isGameEnd && (
          <StartGame
            title={gameTitle}
            colorStyle={'memory-matrix'}
            description={gameDescription}
            onPlayHandler={initGame}
            onHowToPlayHandler={onHowToPlayHandler}
          />
        )}
        {isStarted && !isGameEnd && !isHowToPlayDone && (
          <>
            {!isTutorial && (
              <GameStats
                tiles={tiles}
                trial={trial}
                score={score}
                colorStyle={'memory-matrix'}
              />
            )}
            <Board
              tiles={tiles}
              setTiles={setTiles}
              trial={trial}
              setTrial={setTrial}
              addScore={addScore}
              addBonusScore={addBonusScore}
              gameMessage={gameMessage}
              tutorMessage={tutorMessage}
              endTutorial={endTutorial}
              isTutorial={isTutorial}
              setIsGameEnd={setIsGameEnd}
              refreshBestBoard={refreshBestBoard}
              isRotation={isRotation}
              setLastBoard={setLastBoard}
              playSound={playSound}
            />

            <div className="matrix__after-board">
              {isTutorial && (
                <div className="matrix__tutorial-message_loading">
                  {tutorialMessage === 'loading' && tutorialMessage1}
                </div>
              )}

              {isTutorial && (
                <div className="matrix__tutorial-message_game">
                  {tutorialMessage === 'game' && tutorialMessage2}
                </div>
              )}

              <div
                className={cn('matrix__message', {
                  ['matrix__message_show']: tilesLeft > 0,
                })}
              >
                {`${t('MemoryMatrix.game.hintStart')} ${tilesLeft} ${t(
                  'MemoryMatrix.gameHintEnd'
                )}${getEndOfWord(i18n.language, tilesLeft, '????', '????', '????')}`}
              </div>
            </div>
          </>
        )}
        {isHowToPlayDone && (
          <HowToPlayDone
            colorStyle={'memory-matrix'}
            onPlayHandler={initGame}
            typeConfirm={TypeConfirm.button}
          >
            {isRotation ? (
              <HowToPlayRotationMatrix />
            ) : (
              <HowToPlayMemoryMatrix />
            )}
          </HowToPlayDone>
        )}
        {isGameEnd && (
          <Results
            score={score}
            bestBoard={bestBoard}
            colorStyle={'memory-matrix'}
            onRetryHandler={onRetryHandler}
            gameName={gameTitle}
          />
        )}
      </div>
    </>
  );
}
