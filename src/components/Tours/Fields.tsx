import * as React from 'react';

import * as moment from 'moment';

import TextField from 'material-ui/TextField';

import { Lookup } from '../Lookup';
import { LookupEdit as RoutesLookup } from '../Routes';
import { AutoCompletePerson } from '../People';

type TProps = {
  data: Partial<TTourCreate>;
  onChange: (data: Partial<TTourCreate>) => void;
};

const basePoints: TPoints[] = [15, 20, 40, 80, 150];
const pointsItems: { key: string; caption: string; points: TPoints; }[] =
  basePoints.map(p => ({ key: p.toString(), caption: p.toString(), points: p }));

export class Fields extends React.Component<TProps> {
  render() {
    const { onChange, data } = this.props;

    const onPointsChanged = (values: string[]) => {
      const item = pointsItems.find(i => values.indexOf(i.key) !== -1);
      if (item) {
        onChange({ points: item.points });
      }
    };
    const onChanged =
      (handleChange: (value: string) => void): React.ReactEventHandler<HTMLInputElement | HTMLDivElement> =>
        (event) => {
          const target = event.target as HTMLInputElement;
          if (target.nodeName === 'INPUT') {
            handleChange(target.value);
          }
        };
    const onDateChanged = onChanged(value => onChange({ date: moment(value).isValid() ? value : undefined }));
    const dateValue = moment(data.date).format('YYYY-MM-DD');

    return (
      <div>
        <TextField label="Datum" type="date" onChange={onDateChanged} value={dateValue} />
        <RoutesLookup value={data.route} onChange={value => onChange({ route: value })} />
        <Lookup
          label="Punkte"
          multiple={false}
          values={data.points ? [data.points.toString()] : []}
          items={pointsItems}
          onChange={onPointsChanged}
        />
        <AutoCompletePerson
          multiple={true}
          values={data.participants || []}
          onChange={values => onChange({ participants: values })}
        />
      </div>
    );
  }
}