import React from 'react'

const AddCompany = () => {
    return (
        <div>
            <form>
                    <div class="row g-3">
                        <div class="col-sm-12">
                            <div class="form-floating">
                                <input className='border' type="text" name="cName" class="form-control" id="gname" placeholder="Company Name" required/>
                                <label for="gname">Company Name</label>
                            </div>
                        </div>
                        
                        <div class="col-sm-12">
                            <div class="form-floating">
                                <input className='border' type="url" class="form-control" id="cage" placeholder="Website Link" required/>
                                <label for="cage">Website Link</label>
                            </div>
                        </div>
                        <div class="col-sm-9">
                            <div class="form-floating">
                                <input className='border' type="text" class="form-control" id="cage" placeholder="Agency Name" />
                                <label for="cage">Agency Name</label>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-floating">
                                <input className='border' type="text" class="form-control" id="cage" placeholder="Agency Code" />
                                <label for="cage">Agency Code</label>
                            </div>
                        </div>

                        <div class="col-6">
                            <button href="#" class="btn btn-success btn-lg" type="submit">

                                Save
                            </button>
                        </div>
                        <div class="col-6">
                            <a href="#" class="btn btn-danger btn-lg" role="button" aria-pressed="true">
                                Cancel
                            </a>
                        </div>
                    </div>
                </form>
        </div>
    )
}

export default AddCompany
