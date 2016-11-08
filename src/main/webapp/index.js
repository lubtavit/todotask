var TodoTask = React.createClass({
  
  getInitialState: function() {
    return {
      datas: []
    }
  },
  
  componentDidMount: function() {
    var th = this;
    this.serverRequest = 
      $.get(this.props.source).then(function(result) {    
          th.setState({
            datas: result
          });
      })
  },
  
  onChildUpdateAction: function(task) {
	  var newDatas = this.state.datas;
	  for (var i in newDatas) {
		     if (newDatas[i].id == task.id) {
		    	 newDatas[i] = task;
		        break;
		     }
		   }
	  this.setState({
			datas: newDatas
		  });
  },
  
  onChildInsertAction: function(task) {
	  this.state.datas.push(task);
	  var newDatas = this.state.datas;
	  this.setState({
		datas: newDatas
	  });
  },
  
  onChildDeleteAction: function(id) {
	  var newDatas = this.state.datas.filter(function(ele) {
          return ele.id != id;
      });
	  
      this.setState({ datas: newDatas });
  },
  
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  
  render: function() {
	  var th = this;
	  return (
      <div>
        <h1>Todo Task</h1>
        <div>
        	<span>
        		{<AddButton callbackParent={(task) => th.onChildInsertAction(task)} />}
        	</span>
        </div>
        {this.state.datas.map(function(todo) {
          return (
            <div id={todo.id} key={todo.id} className="todotask">
            <span>Subject : {todo.subject}</span>,
            <span> Detail : {todo.detail}</span>,
            <span>Status : {todo.status}</span>
            <span>
            	{<EditButton id={todo.id} callbackParent={(id) => th.onChildUpdateAction(id)} />}
            </span>
            <span>
            	{<DeleteButton id={todo.id} callbackParent={(id) => th.onChildDeleteAction(id)} />}
            </span>
            </div>
          );
        })}
      </div>
    )
  }
});

var AddButton = React.createClass({
	  handleClick: function() {
		/*if(ReactDOM.findDOMNode('actionDiv')){
			ReactDOM.unmountComponentAtNode('actionDiv');
		}*/
		ReactDOM.render(
			<AddEditForm mode="add" callbackParent={(task) => this.props.callbackParent(task)}></AddEditForm>,
			document.getElementById('actionDiv')
		);
	  },
	  
	  render: function() {
	    return (<button type="button" onClick={this.handleClick}>Add</button>)
	  }
});

var EditButton = React.createClass({
	
  handleClick: function(id) {
	  var th = this;
	  $.ajax({
		  url: 'rest/v1/todo/get/task/' + id,
		  type: 'GET',
		  success: function(data) {
			  if (data) {
				var id = data.id;
				var subject = data.subject;
				var detail = data.detail;
				var status = data.status;
				/*if(ReactDOM.findDOMNode('actionDiv')){
					ReactDOM.unmountComponentAtNode('actionDiv');
				}*/
			  	ReactDOM.render(
					<AddEditForm mode="edit" 
						callbackParent={(task) => th.props.callbackParent(task)}
						subject={subject}
						detail={detail}
						status={status}
						id={id}
					>
					</AddEditForm>,
					document.getElementById('actionDiv')
				);
	          } else {
	        	 
	          }
		  }  
	  
	  });
  },
  
  render: function() {
    return (<button type="button" onClick={this.handleClick.bind(this, this.props.id)}>Edit</button>)
  }
});

var DeleteButton = React.createClass({
	  handleClick: function(id) {
		 var th = this;
		 $.ajax({ 
			 url: 'rest/v1/todo/delete/' + id, 
			 type: 'DELETE',
			 success: function(result) { 
				 if (result) { 
					alert("deleted");
				 	th.props.callbackParent(id); 
				 } else { 
					 alert("Cannot delete"); 
				 } 
			 }
		 });
	  },
	  
	  render: function() {
	    return (<button type="button" onClick={this.handleClick.bind(this, this.props.id)}>Delete</button>)
	  }
});

var AddEditForm = React.createClass({
	getInitialState: function() {
	    return {
	      id: "",
	      subject: "",
	      detail: "",
	      status: "",
	    }
	},
	
	handleAdd: function() {
		var th = this;
		var mode = this.props.mode;
		var url = "rest/v1/todo/" + mode;
        $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: 'application/json',
            url: url,
            data: this.formToJSON(),
            success: function(data) {
                alert(mode + " success");
                th.props.callbackParent(data);
                th.destroyAddEditForm();
            },
            error: function() {
            	alert(mode + " data failed");
            }
        });
    },
    
    
 
    
    formToJSON: function() {
    	var id = $("#formdata").find("#id").val();
        var subject = $("#formdata").find("#subject").val();
        var detail = $("#formdata").find("#detail").val();
        var status = $("#formdata").find("#status").val();
    	return JSON.stringify({
        	"id": id,
            "subject": subject,
            "detail": detail,
            "status": status,
         });
    },
    
    handleSubjectChnge: function(event) {
    	this.setState({"subject": event.target.value});
    },
    
    handleDetailChnge: function(event) {
    	this.setState({"detail": event.target.value});
    },
    
    handleStatusChnge: function(event) {
    	this.setState({"status": event.target.value});
    },
    
    handleIdChnge: function(event) {
    	this.setState({"id": event.target.value});
    },
    
    destroyAddEditForm: function () {
    	ReactDOM.unmountComponentAtNode(document.getElementById('actionDiv'));
	},
    
	render: function() {
	    return (
	      <form action="post" id="formdata">
		      <div className={this.props.mode}>
		      	<input defaultValue={this.props.id} type='hidden' name='id' id='id' onChange={this.handleIdChnge} />
		      	<div>
		      		Subject : <input defaultValue={this.props.subject} type='text' name='subject' id='subject' onChange={this.handleSubjectChnge} />
				</div>
				<div>
					Detail : <textarea defaultValue={this.props.detail} name='detail' id='detail' onChange={this.handleDetailChnge} />
				</div>
				<div>
					Status : 
					<select name='status' id='status' defaultValue={this.props.status} onChange={this.handleStatusChnge}>
						<option value='PENDING'>PENDING</option>
						<option value='DONE'>DONE</option>
					</select>
				</div>
				<div>
					<input type='button' onClick={this.handleAdd} value={this.props.mode} />
					<input type='button' onClick={this.destroyAddEditForm} value='Close' />
		      	</div>
		      </div>
	      </form>
	    )
	}
});

ReactDOM.render(
	<TodoTask source="rest/v1/todo/getall/task" />,
	document.getElementById('showdata')
);

	