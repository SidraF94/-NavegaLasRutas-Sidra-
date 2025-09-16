import React from 'react';
import useEmojiForm from '../../hooks/useEmojiForm';
import EmojiFormContent from './EmojiFormContent';
import EmojiFormReset from './EmojiFormReset';
import './EmojiForm.css';

const EmojiForm = ({ modoNocturno }) => {
  const emojiFormData = useEmojiForm();

  return (
    <div className={`emoji-form ${modoNocturno ? "modo-nocturno" : ""}`}>
      <EmojiFormContent
        {...emojiFormData}
        modoNocturno={modoNocturno}
      />
      
      <EmojiFormReset
        onReset={emojiFormData.resetForm}
        modoNocturno={modoNocturno}
      />
    </div>
  );
};

export default EmojiForm;
