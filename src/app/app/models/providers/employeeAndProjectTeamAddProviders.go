package providers

import (
	"app/app/mappers"
	"app/app/models"
	. "app/app/supporting"
)

func EmployeeAndProjectTeamAdd(employeeAndProjectTeam models.EmployeeAndProjectTeam, err error) map[string]interface{} {
	data := make(map[string]interface{})
	if err == nil {
		data["error"] = ErrorInDatabase(mappers.EmployeeAndProjectTeamAdd(employeeAndProjectTeam))
	} else {
		data["error"] = ErrorInGetDataFromUser(err)
	}
	return data
}

func EmployeeAndProjectTeamRemove(employeeAndProjectTeam models.EmployeeAndProjectTeam, err error) map[string]interface{} {
	data := make(map[string]interface{})
	if err == nil {
		data["error"] = ErrorInDatabase(mappers.EmployeeAndProjectTeamRemove(employeeAndProjectTeam))
	} else {
		data["error"] = ErrorInGetDataFromUser(err)
	}
	return data
}
