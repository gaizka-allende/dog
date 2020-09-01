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
            overflow: hidden;
          }
          @media only screen and (max-width: 375px) {
           .container {
              margin: 0 auto;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Layout

