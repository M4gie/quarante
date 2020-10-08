import React from 'react';

import { BlindTestConainer } from '../GameContainer';
import BlindTestSound from '../GameSound/BlindTestSound';
import Timer from '../Timer';

export default function BlindTest() {
  return (
    <>
      <Timer />
      <BlindTestConainer />
      <BlindTestSound />
    </>
  );
}
