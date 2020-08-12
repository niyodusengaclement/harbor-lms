import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import SpecificCourse from "../components/SpecificCourse";
import ReactQuill from 'react-quill';
import { connect } from "react-redux";
import { Spinner, Dropdown, Button, ProgressBar } from "react-bootstrap";
import { getDateAndTime } from "../helpers/getDate";
import { saveNote, getNotes, deleteNote, updateNote, uploadNoteFile } from "../redux/actions/noteActions.js";
import ModalLayout from "../components/ModalLayout";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TableLayout from "../components/TableLayout";
import { student } from "../components/Sidebar/menu";

const Notes = (props) => {
  const [ show, setShow ] = useState(false);
  const [ description, setDescription] = useState('');
  const [ title, setTitle] = useState('');
  const [ isUpdate, setIsUpdate] = useState(false);
  const [ oldData, setOldData] = useState();
  const [ isFile, setIsFile ] = useState(false);
  const [ file, setFile ] = useState();

  const { notes, userProfile, sections, match: { params }  } = props;
  const { role, fullName } = userProfile;

  useEffect(() => {
    props.getNotes(params.courseId);
  }, []);
 

  const handleShow = () => setShow(!show);
  const onError = (error) => {
    toast.error(error, {
      position: 'top-center',
      hideProgressBar: true,
    });
  }
  const handleClick = () => {
    if(!isFile && !title) return onError('Title is required please');
    if(!isFile && !description) return onError('Description is required please');

    const data = {
      courseId: params.courseId,
      title,
      description,
      createdOn: new Date().setTime(new Date()),
    }
    handleShow();
    setTitle('');
    setDescription('');
    if (isUpdate) {
      return props.updateNote({
        id: oldData.id,
        title,
        description,
        createdOn: oldData.createdOn,
      });
    }
    if(isFile) {
      const info = {
        courseId: params.courseId,
        isFile,
        fileType: file[0].type,
        title: file[0].name,
        createdOn: new Date().setTime(new Date()),
      }
      return props.saveFile(file[0], info);
    }
    props.saveNote(data);
  }

  const addFile = () => {
    setIsFile(true);
    handleShow();
  }

  const deleteNote = (id) => {
    const yes = window.confirm('Are you Sure! This action is irreversible');
    if(yes) {
      props.delete(id);
    }
  }

  const editNote = (note) => {
    setOldData(note);
    setTitle(note.title);
    setDescription(note.description);
    setIsUpdate(true);
    setIsFile(false);
    handleShow();
  }
  const showEmptyForm = () => {
    setTitle('');
    setDescription('');
    setIsUpdate(false);
    setIsFile(false);
    handleShow();
  }

  const buttons = [
    {
      name: 'Add Note',
      clickHandler: showEmptyForm
    },
    {
      name: 'Upload file',
      clickHandler: addFile
    },
  ];

  const isDecoded = (details) => {
    const encodedUrl = encodeURIComponent(details.fileUrl);
    const decodedFileTypes = ['image', 'audio', 'video'];
    const type = details.fileType ? details.fileType.split('/') : [];
    if(decodedFileTypes.indexOf(type[0]) !== -1) {
      return details.fileUrl;
    }
    return `https://docs.google.com/viewer?embedded=true&url=${encodedUrl}`
  }

  const noteDetails = notes.values.find(({id}) => id === params.noteId);
  const Loading  = notes.isLoading ? 
        <Spinner
          animation="border"
          variant="primary"
          className={notes.isLoading ? 'spinner--position__center' : 'hide'}
        />
        : <p className="pl-3">Data not found</p>;

  return (
    <SpecificCourse page={`${localStorage.getItem('courseName')} > Notes `} submenu="Notes" buttons={buttons}>


      <>
      <ModalLayout handleShow={handleShow} handleClick={handleClick} show={show} header="Add Note" buttonName={isUpdate ? 'Update' : 'Save'}>
      {
        isFile ?
          <div className="modal-body">
            <div className="form-group">
              <input type="file" onChange={e => setFile(e.target.files)} className="form-control" />
            </div>
          </div>
        :
          <div className="ql-editor">
          <div className="form-group">
            <label >Title<span className="required"> *</span></label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
          </div>
            <label >Description<span className="required"> *</span></label>
            <ReactQuill
              value={description}
              onChange={setDescription}
            />
        </div>
      }
      </ModalLayout>
             
      <div className="col-md-8">
        {
          notes.isUploading ? <ProgressBar animated now={notes.progress} /> : null
        }

          {
            noteDetails ?
          <>
            <div>
              <h3> {noteDetails.title}</h3>
              <hr />
            </div>

          <div className={noteDetails.isFile ? '' : "carded-table-scroll carded-details " } >
            <div className="p-3">
            {

              noteDetails.isFile ?
                <iframe className="carded-table-scroll" src={isDecoded(noteDetails)} ></iframe>
              :
              <div dangerouslySetInnerHTML={{__html: noteDetails.description}}></div>

            }
              
            </div>
          </div>
          </>
          : !params.noteId ? null
          :Loading
          
          }

        <div className={`carded-table-scroll large-scroll ${noteDetails ? 'hide' : ''}`}>
          <TableLayout headers={['Title', 'Created on', '']}>      
            {
              notes.values.length > 0 ? notes.values.map((note) => 
                <tr key={note.id} >
                  <td> 
                    <Link className="black-links" to={`/courses/${params.courseId}/notes/${note.id}`} >{note.title}</Link>
                  </td>
                  <td>{getDateAndTime(note.createdOn)}</td>

                    <td>
      
                    <div className={`dropdown-no-caret float-right ${role === 'instructor' ? '' : 'hide'}`}>
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-button-drop-left">
                            <div className="drop-menu"><FontAwesomeIcon icon={faEllipsisH} /></div>
                          </Dropdown.Toggle>
      
                          <Dropdown.Menu>
                            {
                              !note.isFile ?
                              <Dropdown.Item onClick={(e) => editNote(note)} ><span className="">Edit</span></Dropdown.Item>
                              : null
                            }
                            <Dropdown.Item onClick={(e) => deleteNote(note.id)} ><span className="required">Delete</span></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    
                    </td>
                </tr>
              ) : Loading
            }
          </TableLayout>
        </div>
        </div>
        <div className="col">
        </div>
        </>
    </SpecificCourse>
  );
}

const mapStateToProps = ({ assignments, notes, firebase }) => ({
  notes,
  userProfile: firebase.profile,
  assignments
});

export default connect(mapStateToProps, {
  saveNote: saveNote,
  getNotes: getNotes,
  delete: deleteNote,
  updateNote: updateNote,
  saveFile: uploadNoteFile
})(Notes);
