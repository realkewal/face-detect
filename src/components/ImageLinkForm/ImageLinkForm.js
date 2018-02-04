import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onDetectClick }) => {
    return (
        <div className='tc'>
            <p className='f3 white'>
                {'This AI will detect faces in your photos. Give it a try!'}
            </p>
            <div className='pa4 br3 center shadow-5 form ma3'>
                <input
                    placeholder='Enter image URL' 
                    className='f4 pa2 w-70 center' 
                    type='text' 
                    onChange={onInputChange} 
                />
                <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-dark-gray br0 pointer' 
                    onClick={onDetectClick}>
                    Detect
                </button>
            </div>
        </div>
    )

}

export default ImageLinkForm;