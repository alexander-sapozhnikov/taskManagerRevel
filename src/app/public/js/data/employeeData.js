import {dataUsualAction} from "../supporting/dataUsualAction.js";
import {informAboutErrorWithWorkData} from "../supporting/helpFunction.js";

export function Employee(idEmployee, firstName, middleName, lastName){
    this.idEmployee = idEmployee;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
}

const URL = "/employee/"

class EmployeeData{


    getAll(){
        return dataUsualAction.getSomething(URL)
    }

    getById(idEmployee){
        return dataUsualAction.getSomething(URL + idEmployee);
    }

    getByLoginAndPassword(item){
        return fetch(URL  + "authorization", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)})
            .catch(error => {informAboutErrorWithWorkData(error)})
            .then(response => {
                if (!response.ok) informAboutErrorWithWorkData(response, "Попробуйте ещё раз!")
                else return response.json()})
            .then(response => {
                if (response.error) informAboutErrorWithWorkData(response, "Попробуйте ещё раз!")
                else return response})
    }

    getByProjectTeam(projectTeam){
        return dataUsualAction.getSomething(URL + "projectTeam/" + projectTeam.idProjectTeam);
    }

    remove(item){
        dataUsualAction.remove(item, URL)
    }

    save(item){
        dataUsualAction.save(item, URL)
    }

    update(item, idEmployee){
        item.idEmployee = idEmployee
        dataUsualAction.update(item, URL)
    }
}

let employeeData = new EmployeeData()

export {employeeData}
