import React, {useState} from 'react'
import {IRole} from '../interfaces'
import {Role} from "./Role";

type RolesListProps = {
    rolesList: Array<IRole>
    editRole: (name: string, position: number) => void
    deleteRole: (name: string, position: number) => void
    addNewRole: () => void
}

export const RolesList: React.FC<RolesListProps> = ({rolesList, editRole, deleteRole, addNewRole}) => {

  return (
    <>
      <ul className="roles_list">
        {
          rolesList.map(r =>
            <Role
              key={r.position}
              name={r.name}
              position={r.position}
              editRole={editRole}
              deleteRole={deleteRole}
              addNewRole={addNewRole}
            />)
        }
      </ul>
    </>
  )
}
