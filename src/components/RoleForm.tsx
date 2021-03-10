import React, {useState} from 'react';
import {IRole} from "../interfaces";

type RoleFormProps = {
  showFormToggle: () => void
  clickedRole : IRole
  saveRoles: (name: string, position: number) => void
}

const RoleForm: React.FC<RoleFormProps> = ({showFormToggle, clickedRole, saveRoles}) => {
  const [name, setName] = useState<string | undefined>(clickedRole.name)

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const closeHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    showFormToggle()
  }

  const saveHandler = (name: string | undefined, position: number | undefined) => {
    if(name && position) {
      saveRoles(name, position)
    }
  }

  const keyPressHandler = (event: React.KeyboardEvent ) => {
    if (event.key === 'Enter') {
      setName('')
      saveHandler(name, clickedRole.position)
    }
  }

  return (
    <div className="dm-overlay" id="win1">

      <div className="dm-table">
        <div className="dm-cell">
          <div className="dm-modal">

            <svg
              onClick={closeHandler}
              className="form-close"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="48px" height="48px">
              <path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>

            <div className="pl-left">
            </div>
            <p>Введите название роли</p>
            <input
              type="text"
              value={name}
              onChange={changeHandler}
              onKeyPress={keyPressHandler}
            />
            <button
              className="butt_save"
              onClick={() => saveHandler(name, clickedRole.position)}>
              Сохранить
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RoleForm;
