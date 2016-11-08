package com.dotography.todotask;

public class TodoTask {

	/**
	 * 
	 * @author lubtavit.k
	 * All Status
	 *
	 */
	enum TaskStatus {
		PENDING, DONE
	}

	private Long id;
	private String subject;
	private String detail;
	
	/**
	 * Default Status is Pending
	 */
	private TaskStatus status = TaskStatus.PENDING;

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public TaskStatus getStatus() {
		return status;
	}

	public void setStatus(TaskStatus status) {
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
