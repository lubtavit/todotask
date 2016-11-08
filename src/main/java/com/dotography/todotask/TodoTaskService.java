package com.dotography.todotask;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.dotography.todotask.TodoTask.TaskStatus;

@Path("/v1/todo")
@Produces({ MediaType.APPLICATION_JSON })
public class TodoTaskService {

	private TaskRepo repo = TaskRepo.getInstance();

	/**
	 * get all todo task
	 * 
	 * 
	 * @return
	 */
	@GET
	@Path("/getall/task")
	public List<TodoTask> getAllTask() {
		List<TodoTask> allTasks = repo.getAllTasks();
		return allTasks;

	}

	/**
	 * get single todo task by id
	 * 
	 * @param id
	 * @return
	 */
	@GET
	@Path("/get/task/{id}")
	public TodoTask getTaskById(@PathParam("id") Long id) {
		TodoTask task = repo.getTaskById(id);
		return task;

	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Path("/add")
	public TodoTask addTask(TodoTask task) {
		return repo.insertTask(task);
	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Path("/edit")
	public TodoTask editTask(TodoTask task) {
		return repo.updateTask(task);
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Path("/edit/status/{id}/{status}")
	public TodoTask editTaskStatus(@PathParam("id") Long id, String status) {
		TodoTask taskById = repo.getTaskById(id);
		taskById.setStatus(TaskStatus.valueOf(status));
		
		return repo.updateTask(taskById);
	}

	/**
	 * delete todo task by id
	 * 
	 * @param id
	 * @return
	 */
	@DELETE
	@Path("/delete/{id}")
	public boolean deleteTask(@PathParam("id") Long id) {
		return repo.deleteTask(id);
	}
}
