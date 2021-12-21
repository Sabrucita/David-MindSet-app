import { useState } from 'react';
import styles from './signup.module.css';
import SignUp1 from './signup1';
import SignUp2 from './signup2';

function SignUp() {
  const FormTitle = ['Sign Up', 'Sign Up2'];
  const [page, setPage] = useState(0);
  const PageDisplay = () => {
    if (page === 0) {
      return <SignUp1 />;
    } else if (page === 1) {
      return <SignUp2 />;
    }
  };

  return (
    <>
      <body>
        <section className={styles.container}>
          <h1 className={styles.mainTitle}>{FormTitle[page]}</h1>
          {PageDisplay()}
          <button
            className={styles.buttonGreen}
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            className={styles.buttonGreen}
            disabled={page === FormTitle.length - 1}
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}
          >
            Continue
          </button>
        </section>
      </body>
    </>
  );
}

export default SignUp;
