package com.dotography.todotask;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class TaskRepo {

	private static TaskRepo instance;
	private static List<TodoTask> allTask;
	private static long maxId = 11;

	private TaskRepo() {
	}

	public static TaskRepo getInstance() {
		if (instance == null) {
			instance = new TaskRepo();
			allTask = new ArrayList<>();
			setupTask();
		}

		return instance;
	}

	public List<TodoTask> getAllTasks() {
		return allTask;
	}
	
	public TodoTask getTaskById(Long id) {
		Iterator<TodoTask> iterator = allTask.iterator();
		while(iterator.hasNext()){
			TodoTask next = iterator.next();
			if(id.equals(next.getId())) {
				//iterator.remove();
				return next;
			}
		}
		
		return null;
	}
	
	public boolean deleteTask(Long id) {
		Iterator<TodoTask> iterator = allTask.iterator();
		while(iterator.hasNext()){
			TodoTask next = iterator.next();
			if(id.equals(next.getId())) {
				iterator.remove();
				return true;
			}
		}
		
		return false;
	}
	
	public TodoTask insertTask(TodoTask task) {
		task.setId(getCurrentId());
		
		boolean isAdded = allTask.add(task);
		if(isAdded){
			return task;
		}else{
			return null;
		}
	}
	
	public TodoTask updateTask(TodoTask task) {
		Long updateId = task.getId();
		int totalSize = allTask.size();
		int i;
		for (i = 0; i < totalSize; i++) {
			TodoTask todoTask = allTask.get(i);
			if(updateId.equals(todoTask.getId())) {
				break;
			}
		}
		
		allTask.remove(i);
		
		allTask.add(i, task);;
		return task;
	}
	
	private Long getCurrentId() {
		return maxId++;
	}
	
	private static void setupTask() {
		for(int i = 1; i < maxId; i++) {
			TodoTask task = new TodoTask();
			task.setId(Long.valueOf(i));
			
			task.setSubject("default subject - " + i);
			task.setDetail("default detail - " + i);
			
			allTask.add(task);
			
		}
	}
}
