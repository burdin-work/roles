import React from 'react'
import {IRole} from '../interfaces'
import {Role} from "./Role";

type RolesListProps = {
    editRole: (name: string | undefined, position: number | undefined) => void
    deleteRole: (name: string | undefined, position: number | undefined) => void
    addNewRole: () => void
    rolesList: IRole[]
    dragStartHandler: (e : React.DragEvent<HTMLElement>, arg1: IRole) => void
    dragLeaveHandler: (e : React.DragEvent<HTMLElement>) => void
    dragEndHandler: (e : React.DragEvent<HTMLElement>) => void
    dragOverHandler: (e : React.DragEvent<HTMLElement>) => void
    dropHandler: (e : React.DragEvent<HTMLElement>, arg1: IRole) => void
}

export const RolesList: React.FC<RolesListProps> = ({editRole, deleteRole, addNewRole,
  dragStartHandler, dragLeaveHandler, dragEndHandler,
  dragOverHandler, dropHandler, rolesList}) => {

  return (
    <>
      <ul className="roles_list">
        {
          rolesList && rolesList
            .map(r =>
              <Role
                key={r.position}
                name={r.name}
                position={r.position}
                editRole={editRole}
                deleteRole={deleteRole}
                addNewRole={addNewRole}
                dragStartHandler={dragStartHandler}
                dragLeaveHandler={dragLeaveHandler}
                dragEndHandler={dragEndHandler}
                dragOverHandler={dragOverHandler}
                dropHandler={dropHandler}
              />)
        }
      </ul>
    </>
  )
}
