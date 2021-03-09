import React from 'react'
const edit_icon = require('../assets/images/Union.png').default
const create_icon = require('../assets/images/Vector.png').default
const delete_icon = require('../assets/images/Group.png').default

type RoleProps = {
    name: string
    position: number
    editRole: (name: string, position: number) => void
    deleteRole: (name: string, position: number) => void
    addNewRole: () => void
}

export const Role: React.FC<RoleProps> = ({name, position, editRole, deleteRole, addNewRole}) => {

  return (
    <li>

      <div className="role visible-role">
        <img src={edit_icon}
          className="edit_icon"
          alt="edit_icon"
          onClick={() => editRole(name, position)}
        />
        <span className="role-name">
          {name}
        </span>

        <div className="hidden-options">
          <div className="role invisible-role">
            <img src={edit_icon}
              className="edit_icon"
              alt="edit_icon"
              onClick={() => editRole(name, position)}
            />
            <span className="role-name">
              {name}
            </span>
            <img src={create_icon}
              className="create_icon"
              alt="create_icon"
              onClick={() => addNewRole()}
            />
            <img src={delete_icon}
              className="delete_icon"
              alt="delete_icon"
              onClick={() => deleteRole(name, position)}
            />
          </div>
        </div>
      </div>
    </li>
  )
}
