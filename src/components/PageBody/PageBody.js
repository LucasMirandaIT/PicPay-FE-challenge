import "./PageBody.css";

function PageBody({ title, action, children }) {
  return (
    <div className="pageBody-container">
      <section className="header">
        <span className="title">{title}</span>
        {action}
      </section>
      <section className="content">{children}</section>
    </div>
  );
}

export default PageBody;
