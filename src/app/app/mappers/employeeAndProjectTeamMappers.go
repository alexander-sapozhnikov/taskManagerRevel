package mappers

import (
	"app/app/models"
	"app/app/supporting"
	"fmt"
)

func EmployeeAndProjectTeamAdd(employeeAndProjectTeam models.EmployeeAndProjectTeam)  error {
	sqlString := `INSERT INTO employeeandprojectteam (idprojectteam, idemployee) VALUES ($1, $2);`
	_, err := supporting.DB.Exec(sqlString, employeeAndProjectTeam.IdProjectTeam, employeeAndProjectTeam.IdEmployee)
	fmt.Println(err)
	return  err
}

func EmployeeAndProjectTeamRemove(employeeAndProjectTeam models.EmployeeAndProjectTeam)  error {
	sqlString := `DELETE FROM employeeandprojectteam WHERE idprojectteam = $1 AND  idemployee = $2`
	_, err := supporting.DB.Exec(sqlString, employeeAndProjectTeam.IdProjectTeam, employeeAndProjectTeam.IdEmployee)
	return  err
}