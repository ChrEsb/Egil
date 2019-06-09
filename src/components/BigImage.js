import React, { useEffect, useState } from 'react';
import RectangleSelection from "react-rectangle-selection";
import { Rnd } from "react-rnd";
import styled from 'styled-components';

const BigImageContainer = styled.div`
  z-index: 1;
`;

const SelectionRectContainer = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

const selectionBoxStyle = {
  background: "transparent",
  border: "solid 2px #1ae0b2",
  borderRadius: "6px",
  boxShadow: "0px 0px 0px 9999px rgba(255, 255, 255, 0.5)"
};

const BigImage = ({ addSelection, currentIndex, img, imgRef, imgContainer }) => {
  const [isSelecting, setSelecting] = useState(false);
  const [currentSelection, setCurrent] = useState({});
  const [rectState, setRectState] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    offsetCorrection: true
  });
  const [activeSelection, setActiveSelection] = useState(false);

  // Reset all states when a new image is being selected.
  useEffect(() => {
    setSelecting(false);
    setCurrent({});
    setRectState({
      offsetCorrection: !currentIndex,
      left: 0,
      top: 0,
      width: 0,
      height: 0
    });
    setActiveSelection(false);
  }, [currentIndex]);

  /**
   * Callback for when dragging.
   * @param  {Object} coords The current cursor coordinates.
   */
  const handleSelecting = (e, coords) => {
    if (!isSelecting) {
      setSelecting(true);
    }

    setCurrent(coords);
  }

  /**
   * Callback for when a selection has been made.
   */
  const handleSelected = () => {
    if (!isSelecting) {
      return;
    }

    const selected = addSelection(currentIndex, currentSelection);
    if (selected) {
      setRectState({
        ...rectState,
        left: rectState.offsetCorrection ? selected.origin[0] : selected.start[0],
        top: rectState.offsetCorrection ? selected.origin[1] : selected.start[1],
        height: selected.size[1],
        width: selected.size[0],
      });
      setActiveSelection(true);
    }
    setSelecting(false);
  }

  /**
   * Callback for when the selection rectangle is dragged.
   * @param  {Object} position The new position of the rectangle.
   */
  const handleDrag = (position) => {
    setRectState({
      ...rectState,
      left: position.x,
      top: position.y,
      offsetCorrection: false
    });
    addSelection(currentIndex, {
      start: [position.x, position.y]
    });
  }

  /**
   * Callback for when the selected rectangle is resized.
   * @param  {Object} ref      The ref to the rectangle.
   * @param  {Object} position The new position of the rectangle.
   */
  const handleResize = (ref, position) => {
    setRectState({
      left: position.x,
      top: position.y,
      height: ref.style.height,
      width: ref.style.width
    });
    addSelection(currentIndex, {
      start: [position.x, position.y],
      size: [ref.clientWidth, ref.clientHeight]
    });
  }

  /**
   * Callback for the initial resize of the rectangle.
   */
  const handleResizeStart = () => {
    // Library behave funky with the position. Deduct offset here to fix.
    if (!rectState.offsetCorrection) {
      return;
    }
    const offsetL = imgContainer.current.offsetLeft;
    const offsetT = imgContainer.current.offsetTop;
    setRectState({
      ...rectState,
      left: rectState.left - offsetL,
      top: rectState.top - offsetT,
      offsetCorrection: false
    });
  }

  return (
    <BigImageContainer ref={imgContainer}>
      <SelectionRectContainer active={activeSelection}>
        <Rnd
          style={selectionBoxStyle}
          size={{ width: rectState.width, height: rectState.height }}
          position={{ x: rectState.left, y: rectState.top }}
          onDragStop={(e, d) => handleDrag(d)}
          onResize={(e, direction, ref, delta, position) => handleResize(ref, position) }
          onResizeStart={ handleResizeStart }
        />
      </SelectionRectContainer>
      <RectangleSelection
        disabled={activeSelection}
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
    </BigImageContainer>
  );
}

export default BigImage;
