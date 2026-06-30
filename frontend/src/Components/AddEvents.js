import React from 'react'

const AddEvents = () => {
  return (
    <div className='conatiner my-4'>
      <h1>Host an Event!!</h1>
      <form className='my-4'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Event Name</label>
    <input type="text" className="form-control" id="title" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Location</label>
    <input type="text" className="form-control" id="location"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Date</label>
    <input type="text" className="form-control" id="date"/>
  </div>
  <button type="text" className="btn btn-primary">Host Event!!</button>
</form>
    </div>
  )
}

export default AddEvents
