import React from 'react'
import {IRole} from "../interfaces";
const edit_icon = require('../assets/images/Union.png').default
const create_icon = require('../assets/images/Vector.png').default
const delete_icon = require('../assets/images/Group.png').default

type RoleProps = {
    name: string | undefined
    position: number | undefined
    editRole: (name: string | undefined, position: number | undefined) => void
    deleteRole: (name: string | undefined, position: number | undefined) => void
    addNewRole: () => void
    dragStartHandler: (e : React.DragEvent<HTMLElement>, arg1: IRole) => void
    dragLeaveHandler: (e : React.DragEvent<HTMLElement>) => void
    dragEndHandler: (e : React.DragEvent<HTMLElement>) => void
    dragOverHandler: (e : React.DragEvent<HTMLElement>) => void
    dropHandler: (e : React.DragEvent<HTMLElement>, arg1: IRole) => void
}

export const Role: React.FC<RoleProps> = ({name, position, editRole, deleteRole, addNewRole,
  dragStartHandler, dragLeaveHandler, dragEndHandler,
  dragOverHandler, dropHandler}) => {

  return (
    <li
      draggable
      onDragStart={ (e) => dragStartHandler( e, {name, position} ) }
      onDragLeave={ (e) => dragLeaveHandler(e) }
      onDragEnd={ (e) => dragEndHandler(e) }
      onDragOver={ (e) => dragOverHandler(e)}
      onDrop={ (e) => dropHandler( e, {name, position} )}
    >

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
