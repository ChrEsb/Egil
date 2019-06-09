import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import BigImage from './components/BigImage';
import SelectedList from './components/SelectedList';

import image from './img/image.png';


const Main = styled.div`
  background-color: #f7f9f8;
  display: flex;
  justify-content: center;
  padding 100px 0;
`;

const Container = styled.div`
  border-radius: 3px;
  box-shadow: 10px 13px 44px -24px rgba(0,0,0,0.75);
  display: flex;
  overflow: hidden;
`;

const App = () => {
  const [selections, setSelections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgRef = useRef(null);
  const imgContainer = useRef(null);

  /**
   * Helper function to ensure that top-left point is used as origin and calculates the size.
   * @param  {Object} selection The coordinates selected.
   * @return {Object}           The start coordinates and the size.
   */
  const formatSelection = (selection, index) => {
    if (!selection.target) {
      return selection;
    }
    // Get correct offset.
    const img = imgContainer.current;
    const offsetL = img.offsetLeft;
    const offsetT = img.offsetTop;

    // Get correct start and end positions (depends on the direction the rectangle was dragged.)
    const start = selection.origin[0] < selection.target[0] ? selection.origin : selection.target;
    const end = selection.origin[0] < selection.target[0] ? selection.target : selection.origin;

    return {
      origin: [...start],
      start: [
        start[0] - offsetL,
        start[1] - offsetT,
      ],
      size: [
        end[0] - start[0],
        end[1] - start[1],
      ]
    }
  };

  /**
   * Adds or updates a rectangle to the list of selections.
   * @param  {int}    index     The index in the selections array.
   * @param  {Object} selection The coordinates of the selection.
   * @return {Object} The coordinates object.
   */
  const addSelection = (index, selection) => {
    if (index >= selections.length) {
      return undefined;
    }
    // Replace the empty selection.
    selections[index] = {
      ...selections[index],
      ...formatSelection(selection)
    };
    setSelections([...selections]);
    return selections[index];
  };

  /**
   * Add and empty selection the the selections array.
   */
  const addEmptySelection = () => {
    setSelections([
      ...selections,
      undefined
    ]);
    setCurrentIndex(selections.length);
  };

  return (
    <Main className="App">
      <Container>
        <BigImage
          addSelection={ addSelection }
          currentIndex={ currentIndex }
          img={ image }
          imgRef={ imgRef }
          imgContainer={ imgContainer }
        />
        <SelectedList
          addEmptySelection={ addEmptySelection }
          imgRef={ imgRef }
          selections={ selections }
        />
      </Container>
    </Main>
  );
}

export default App;
