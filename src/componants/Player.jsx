import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function handleEditClick() {
    setIsEditing((edting) => !edting);
    onChangeName(symbol, playerName);
  }

  function handleChange(event) {
    //we are getting the event value bcpz we are calling it using the onchangle
    //element that occures the event and value is the value user want to set
    if (event.target.value == null) event.target.value = initialName;
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let buttonCaption = "Edit";
  if (isEditing) {
    editablePlayerName = (
      <input type="text" value={playerName} onChange={handleChange} required />
    );
    buttonCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{buttonCaption}</button>
    </li>
  );
}
//         let buttonContent = <span className="player-name">{name}</span>;
//         let buttonType = <button onClick={editClicked}>Edit</button>;
//          function editClicked(){
//             setIsEditing(!isEditing);
//          }
//          function doneClicked(){
//            buttonContent = <span className="player-name">{name}</span>;
//          }

// if(isEditing){
//     buttonContent = <input type="text" />
//     buttonType=<button onClick={doneClicked} >Done</button>;
// }
