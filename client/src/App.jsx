import React,{useReducer} from 'react';
import './App.css';
import DragAndDrop from './DragDrop';
import UploadButton from './UploadButton';
import DisplayTable from './DisplayTable';

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth }
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE_TO_LIST':
        return { ...state, fileList: state.fileList.concat(action.files) };
      case 'SET_FILE_CONTENT':
      return { ...state, content: action.content };
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] }
  )
  const toast = msg =>{
    alert(msg);
  }
  const setContent = (file)=>{
    const textType = /text.*/;
    if (file.type.match(textType)) {
      let reader = new FileReader();
      
      reader.onloadend = () => {
        dispatch({ type: 'SET_FILE_CONTENT', content: reader.result })
      }
      reader.readAsText(file);
    }
  }
  const onChange = e => {
    e.preventDefault();
    const errs = [];
    const files = Array.from(e.target.files);
    let file = e.target.files[0];
    const types = ['text/plain'];
    /***File validations for size length format */
    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }
      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`)
      }
    })
    setContent(file);
    if (errs.length) {
      return errs.forEach(err => toast(err))
    }
  }

  return (
    <div className="app"> 
        <header>
          <div className="header">Upoad and Add Filters to Content</div>
        </header>
        <div className='container'>
          <div className='dropContainer'>
          <DragAndDrop data={data} dispatch={dispatch} setContent={setContent} />
          </div>
          <p className='seperator'>OR</p>
          <div className='uploadContainer'>
          <UploadButton onChange={onChange} />
          </div>
        </div>
     <section className="content">
      <ol className="dropped-files">
        {data.fileList.map(f => {
          return (
            <li key={f.name}>{f.name}</li>
          )
        })}
      </ol>
      <pre className="fileDisplayArea">{data.content}</pre>
      {data.content && <DisplayTable data = {data.content}/>}
      </section>
    </div>
  );
}

export default App;
