import React, { useState } from 'react';
import RectangleSelection from "react-rectangle-selection";

const BigImage = ({ addSelection, img, imgRef }) => {
  const [isSelecting, setSelecting] = useState(false);
  const [currentSelection, setCurrent] = useState({});

  /**
   * Callback for when dragging.
   * @param  {Object} coords The current cursor coordinates.
   */
  const handleSelecting = (e, coords) => {
    if (!isSelecting) {
      setSelecting(true);
    }
    // Set the latest coords in the state.
    //console.log(e.currentTarget.offsetTop);
    setCurrent(coords);
  }

  /**
   * Callback for when a selection has been made.
   */
  const handleSelected = () => {
    if (!isSelecting) {
      return;
    }
    // TODO: Update selectedList
    addSelection(currentSelection);
    setSelecting(false);
  }

  return (
    <RectangleSelection
      onSelect={ (e, coords) => handleSelecting(e, coords) }
      onMouseUp ={ () => handleSelected() }
      style={{
        border: "solid 2px #1ae0b2",
        borderRadius: "6px",
        boxShadow: "0px 0px 0px 9999px rgba(255, 255, 255, 0.5)"
      }}
    >
      <img id="bigImg" src={img} className='big-image' alt='product' ref={imgRef}/>
    </RectangleSelection>
  );
}

export default BigImage;
