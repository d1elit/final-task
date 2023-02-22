import './Loader.scss';

export default function Loader() {
  return (
    <div className="loader">
      <div className="loader__container">
        <span className="loader__item one"></span>
        <span className="loader__item two"></span>
        <span className="loader__item three"></span>
        <span className="loader__item four"></span>
      </div>
    </div>
  );
}
