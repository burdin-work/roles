import React, {useEffect, useState} from 'react'
import {IRole, ICheckedRole} from "./interfaces";
import {RolesList} from "./components/RolesList";
import RoleForm from "./components/RoleForm";

const create_icon = require('./assets/images/Vector.png').default

const rL: Array<IRole> = [
  {name: 'empty1', position: 1},
  {name: 'empty2', position: 2},
  {name: 'empty3', position: 3},
  {name: 'empty4', position: 4},
  {name: 'empty5', position: 5},
  {name: 'empty6', position: 6},
  {name: 'empty7', position: 7},
  {name: 'empty8', position: 8},
  {name: 'empty9', position: 9},
  {name: 'empty10', position: 10},
  {name: 'empty11', position: 11},
  {name: 'empty12', position: 12},
  {name: 'empty13', position: 13},
  {name: 'empty14', position: 14},
  {name: 'empty15', position: 15},
  {name: 'empty16', position: 16},
  {name: 'empty17', position: 17},
  {name: 'empty18', position: 18},
  {name: 'empty19', position: 19},
  {name: 'empty20', position: 20},
  {name: 'empty21', position: 21},
  {name: 'empty22', position: 22},
  {name: 'empty23', position: 23},
  {name: 'empty24', position: 24},
  {name: 'empty25', position: 25},
]

const App: React.FC = () => {
  const [rolesList, setRolesList] = useState<IRole[]>(rL)

  const [checkedRole, setCheckedRole] = useState<ICheckedRole>({
    name: undefined,
    position: undefined
  })
  const [existForm, setExistForm] = useState<boolean>(false)

  useEffect(() => {
    //rolesList.sort((a, b) => a.position - b.position)
    //   .map((o,i) => o.position = i + 1)
  }, [])

  const showFormToggle = () : void  => {
    setExistForm(prev => !prev)
  }

  const editRole = (name: string, position: number) : void  => {
    showFormToggle()
    setCheckedRole( {name, position})
  }

  const saveRoles = (name: string, position: number) : void  => {
    setRolesList(prev => {
      const newList = [...prev]

      if(checkedRole.position !== undefined && checkedRole.position >= newList.length) {
        newList.push({name, position})
        return newList
      }// если сохраняем новую роль

      for(let i=0; i < newList.length; i++){

        if(newList[i].position === position) {
          newList[i].name = name
          break
        }// если меняем существующую роль
      }

      return newList
    })
    showFormToggle()
  }

  const addNewRole = () : void  => {
    console.log('click')
    setCheckedRole( {
      name: undefined,
      position: rolesList.length + 1
    })
    showFormToggle()
  }

  const deleteRole = (name: string, position: number) : void  => {
    setRolesList(prev =>
      [...prev].filter( o => o.position !== position)
        .map( (o, i) => {
          o.position = i + 1
          return o
        })
    )
  }


  return (
    <div className="container main">

      {existForm && <RoleForm
        showFormToggle={showFormToggle}
        checkedRole={checkedRole}
        saveRoles={saveRoles}
      />}

      <h2>Роли</h2>

      <button
        onClick={addNewRole}>
        <img className="create-icon" src={create_icon} alt="create_icon"/>
        Новая роль
      </button>

      <RolesList
        rolesList={rolesList}
        editRole={editRole}
        deleteRole={deleteRole}
        addNewRole={addNewRole}
      />
    </div>
  )
}

export default App
