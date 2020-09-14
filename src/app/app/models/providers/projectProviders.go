package providers

import (
	"app/app/mappers"
	"app/app/models"
	. "app/app/supporting"
)

func ProjectAllGet() map[string]interface{} {
	data := make(map[string]interface{})
	projectAll, err := mappers.ProjectAllGet()
	data["error"] = ErrorInDatabase(err)
	data["data"] = projectAll
	return data
}

func ProjectGet(idProject int64) map[string]interface{} {
	data := make(map[string]interface{})
	project, err := mappers.ProjectGet(idProject)
	data["error"] = ErrorInDatabase(err)
	data["data"] = project
	return data
}

func ProjectGetByProjectTeam(idProjectTeam int64) map[string]interface{} {
	data := make(map[string]interface{})
	project, err := mappers.ProjectGetByProjectTeam(idProjectTeam)
	data["error"] = ErrorInDatabase(err)
	data["data"] = project
	return data
}

func ProjectSave(project models.Project, err error) map[string]interface{} {
	data := make(map[string]interface{})
	if err == nil {
		data["error"] = ErrorInDatabase(mappers.ProjectSave(project))
	} else {
		data["error"] = ErrorInGetDataFromUser(err)
	}
	return data
}

func ProjectUpdate(project models.Project, err error) map[string]interface{} {
	data := make(map[string]interface{})
	if err == nil {
		data["error"] = ErrorInDatabase(mappers.ProjectUpdate(project))
	} else {
		data["error"] = ErrorInGetDataFromUser(err)
	}
	return data
}

func ProjectDelete(project models.Project, err error) map[string]interface{} {
	data := make(map[string]interface{})
	if err == nil {
		data["error"] = ErrorInDatabase(mappers.ProjectDelete(project))
	} else {
		data["error"] = ErrorInGetDataFromUser(err)
	}
	return data
}
