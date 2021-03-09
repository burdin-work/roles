import React, {useState} from 'react'
import {IRole} from "./interfaces";
import {RolesList} from "./components/RolesList";
import RoleForm from "./components/RoleForm";

const create_icon = require('./assets/images/Vector.png').default

const App: React.FC = () => {
  // States for editing
  const [rolesList, setRolesList] = useState<IRole[]>([])

  const [clickedRole, setClickedRole] = useState<IRole>({
    name: undefined,
    position: undefined
  })
  const [existForm, setExistForm] = useState<boolean>(false)

  // Dnd state
  const [draggedCard, setDraggedCard] = useState<IRole>({
    name: undefined,
    position: undefined
  })

  // @ts-ignore // получаем данные из json
  window.setRoles = (roles: string) => {
    setRolesList( JSON.parse(roles) );
  }

  // DnD handlers
  const dragStartHandler = (e : React.DragEvent<HTMLElement>, card: IRole) => {
    setDraggedCard(card)
  }

  const dragLeaveHandler = (e : React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.background = '#202430'
  }

  const dragEndHandler = (e : React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.background = '#202430'
  }

  const dragOverHandler = (e : React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.currentTarget.style.background = '#393e4c'
  }

  const dropHandler = (e : React.DragEvent<HTMLElement>, card: IRole) => {
    const type = 'moved by dnd'
    let newPosition : number | undefined = undefined
    e.preventDefault()
    const newList = rolesList.map( role => {
      if(role.position === card.position) {
        return {...role, position: draggedCard.position}
      }
      if(role.position === draggedCard.position) {
        newPosition = card.position
        return {...role, position: card.position}
      }
      return role
    })
      .sort((a: any, b: any) => a.position - b.position)
    setRolesList(newList)
    sendDataToServer({name: draggedCard.name, position: newPosition}, type)
    e.currentTarget.style.background = '#202430'
  }

  // Handlers for editing
  const showFormToggle = () : void  => {
    setExistForm(prev => !prev)
  }

  const editRole = (name: string | undefined, position: number | undefined) : void  => {
    showFormToggle()
    setClickedRole( {name, position})
  }

  const saveRoles = (name: string, position: number) : void  => {

    setRolesList(prev => {
      let type = 'create'
      const newList = [...prev]
      if(clickedRole.position !== undefined && clickedRole.position > newList.length) {
        newList.push({name, position})
        sendDataToServer({name, position}, type)
        return newList
      }// если сохраняем новую роль

      for(let i=0; i < newList.length; i++){

        if(newList[i].position === position) {
          newList[i].name = name
          type = 'edit'
          break
        }// если меняем существующую роль
      }
      sendDataToServer({name, position}, type)
      return newList
    })
    showFormToggle()
  }

  const addNewRole = () : void  => {
    setClickedRole( {
      name: undefined,
      position: rolesList.length + 1
    })
    showFormToggle()
  }

  const deleteRole = (name: string | undefined, position: number | undefined) : void  => {
    const type = 'remove'
    const newList = rolesList.filter( o => o.position !== position)
      .map( (role, i) => {
        role.position = i + 1
        return role
      })
    setRolesList(newList)
    sendDataToServer({name, position}, type)
  }

  const sendDataToServer = (role: IRole, type: string) : void => {
    console.log(JSON.stringify(role), type)
  }


  return (
    <div className="container main">

      {existForm &&
      <RoleForm
        showFormToggle={showFormToggle}
        clickedRole={clickedRole}
        saveRoles={saveRoles}
      />}

      <h2>Роли</h2>

      <button
        onClick={addNewRole}>
        <img className="create-icon" src={create_icon} alt="create_icon"/>
        Новая роль
      </button>

      <RolesList
        editRole={editRole}
        deleteRole={deleteRole}
        addNewRole={addNewRole}
        dragStartHandler={dragStartHandler}
        dragLeaveHandler={dragLeaveHandler}
        dragEndHandler={dragEndHandler}
        dragOverHandler={dragOverHandler}
        dropHandler={dropHandler}
        rolesList={rolesList}
      />
    </div>
  )
}

export default App
