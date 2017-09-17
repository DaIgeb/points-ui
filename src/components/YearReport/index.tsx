import * as React from 'react';

import { Filter } from './Filter';
import { Report as ReportPart } from './Report';

export const Report = () => (
  <div>
    <Filter />
    <ReportPart />
  </div>
);