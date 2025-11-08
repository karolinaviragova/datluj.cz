import React, { useEffect, useState } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLetterLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false);

  console.log(word);
  const handleKeyUp = (e: KeyboardEvent) => {
    if (lettersLeft.length === 1 && e.key === lettersLeft[0]) {
      onFinish();
    } else if (e.key === lettersLeft[0]) {
      setLetterLeft(lettersLeft.slice(1));
      setMistake(false);
    } else {
      onMistake();
      setMistake(true);
    }
  };

  useEffect(() => {
    if (active === true) {
      document.addEventListener('keyup', handleKeyUp);
      return () => document.removeEventListener('keyup', handleKeyUp);
    } else {
      return () => document.removeEventListener('keyup', handleKeyUp);
    }
  }, [lettersLeft, active, onMistake]);

  return (
    <div className={`${mistake ? 'wordbox wordbox--mistake' : 'wordbox'} `}>
      {lettersLeft}
    </div>
  );
  //{`wordbox ${mistake && 'wordbox--mistake'}`}
};

export default Wordbox;
