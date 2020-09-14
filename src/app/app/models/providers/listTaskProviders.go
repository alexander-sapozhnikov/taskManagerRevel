package providers

import (
	"app/app/mappers"
	"app/app/models"
	. "app/app/supporting"
)

func ListTaskGetByProject(idProject int64) map[string]interface{} {
	data := make(map[string]interface{})
	listTask, err := mappers.ListTaskGetByProject(idProject)
	data["error"] = ErrorInDatabase(err)
	data["data"] = listTask
	return data
}

func ListTaskSave(listTask models.ListTask, err error) map[string]interface{} {
	data := make(map[string]interface{})
	if err == nil {
		data["error"] = ErrorInDatabase(mappers.ListTaskSave(listTask))
	} else {
		data["error"] = ErrorInGetDataFromUser(err)
	}
	return data
}

func ListTaskUpdate(listTask models.ListTask, err error) map[string]interface{} {
	data := make(map[string]interface{})
	if err == nil {
		data["error"] = ErrorInDatabase(mappers.ListTaskUpdate(listTask))
	} else {
		data["error"] = ErrorInGetDataFromUser(err)
	}
	return data
}

func ListTaskDelete(listTask models.ListTask, err error) map[string]interface{} {
	data := make(map[string]interface{})
	if err == nil {
		data["error"] = ErrorInDatabase(mappers.ListTaskDelete(listTask))
	} else {
		data["error"] = ErrorInGetDataFromUser(err)
	}
	return data
}
