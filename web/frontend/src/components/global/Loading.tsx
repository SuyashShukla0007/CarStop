import './Loading.css'; // You can define CSS styles for the spinner in this file

const Loading = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};


export default Loading;


