function Layout({ children }) {
  return (
    <div className="container">
      {children}
      <style jsx>
        {`
          .container {
            margin: 100px auto 0 auto;
            height: 500px;
            width: 900px;
          }
        `}
      </style>
    </div>
  );
}

export default Layout

