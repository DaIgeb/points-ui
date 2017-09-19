import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { LinearProgress } from 'material-ui/Progress';
// import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import { AutoComplete } from '../AutoComplete';
import { Lookup as BaseLookup } from '../Lookup';

import * as fromReducers from '../../reducers';
import * as fromActions from '../../actions';

import { getCaption } from './utils';

type TViewOwnProps = {
  values: string[];
  multiple?: boolean;
};

type TOwnProps = TViewOwnProps & {
  onChange: (selectedItems: string[]) => void;
};
type TStateViewProps = {
  selectedPeople: (TPerson | undefined)[];
  loaded: boolean;
};
type TStateProps = TStateViewProps & {
  people: { key: string; caption: string; }[];
};
type TDispatchProps = {
  reload: () => void;
};
type TProps = TStateProps & TDispatchProps & TOwnProps;
type TViewProps = TStateViewProps & TDispatchProps & TViewOwnProps;

type TComponentState = { anchorEl: HTMLElement | undefined, open: boolean };

class LookupComponent extends React.Component<TProps, TComponentState> {
  constructor() {
    super();

    this.state = {
      anchorEl: undefined,
      open: false
    };
  }
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { people, onChange, loaded, values, multiple } = this.props;
    if (!loaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <BaseLookup
        values={values}
        multiple={multiple || false}
        items={people}
        onChange={onChange}
        label="Fahrer"
      />
    );
  }

  private initialize = (props: TProps) => {
    const { loaded, reload } = props;
    if (!loaded) {
      reload();
    }
  }
}

class LookupViewComponent extends React.Component<TViewProps> {
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TViewProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { loaded, multiple, selectedPeople } = this.props;
    if (!loaded) {
      return <LinearProgress mode="indeterminate" />;
    }

    if (!multiple) {
      return <span>{getCaption(selectedPeople[0])}</span>;
    }

    return (
      <div>
        {selectedPeople.map((p, idx) => <span key={p ? p.id : idx}>{getCaption(p)}</span>)}
      </div>
    );
  }

  private initialize = (props: TViewProps) => {
    const { loaded, reload } = props;
    if (!loaded) {
      reload();
    }
  }
}

class AutoCompleteComponent extends React.Component<TProps> {
  componentWillMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(nextProps: Readonly<TProps>) {
    this.initialize(nextProps);
  }

  render() {
    const { onChange, selectedPeople, multiple } = this.props;

    if (multiple) {
      const newValues = selectedPeople.map(p => p ? p.id : '');

      return (
        <div>
          {selectedPeople.map((p, idx) => {
            const currentValue = p ? { caption: getCaption(p), key: p.id } : undefined;

            return (
              <Button
                key={idx}
                onClick={() => {
                  newValues.splice(idx, 1);
                  onChange(newValues);
                }}
              >
                <p >{currentValue ? `${currentValue.caption} (${currentValue.key})` : 'undefined'}</p>
                <DeleteIcon />
              </Button>
            );
          })}

          <AutoComplete
            label="Start typing the persons last name"
            getItems={this.getSuggestions}
            value={{ key: selectedPeople.length.toString(), caption: '' }}
            onChange={val => onChange([...newValues, val])}
          />
        </div>
      );
    }

    const person = selectedPeople[0];
    const value = person ? { caption: getCaption(person), key: person.id } : undefined;
    return (
      <AutoComplete
        label="Start typing the persons last name"
        getItems={this.getSuggestions}
        value={value}
        onChange={val => onChange([val])}
      />
    );
  }

  private getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.props.people.filter(person => {
        const keep =
          count < 5 &&
          !this.props.selectedPeople.find(p => p !== undefined && p.id === person.key) &&
          person.caption.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }
  private initialize = (props: TProps) => {
    const { loaded, reload } = props;
    if (!loaded) {
      reload();
    }
  }
}

const mapPeopleSelector = createSelector(
  (args: { people: TPerson[] }) => args.people,
  people => people
    .map(r => ({ key: r.id, caption: getCaption(r) }))
    .sort((a, b) => a.caption.localeCompare(b.caption))
);

const mapStateToProps = (state: TState, ownProps: TViewOwnProps): TStateProps => ({
  people: mapPeopleSelector({ people: fromReducers.getPeople(state) }),
  selectedPeople: ownProps.values.map(v => fromReducers.getPerson(state, v)),
  loaded: fromReducers.arePeopleLoaded(state)
});

export const AutoCompletePerson = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    reload: fromActions.people.reload
  }
)(AutoCompleteComponent);

export const Lookup = connect<TStateProps, TDispatchProps, TOwnProps>(
  mapStateToProps,
  {
    reload: fromActions.people.reload
  }
)(LookupComponent);

const mapStateToViewProps = (state: TState, ownProps: TViewOwnProps): TStateViewProps => ({
  selectedPeople: ownProps.values.map(v => fromReducers.getPerson(state, v)),
  loaded: fromReducers.arePeopleLoaded(state)
});
export const LookupView = connect<TStateViewProps, TDispatchProps, TViewOwnProps>(
  mapStateToViewProps,
  {
    reload: fromActions.people.reload
  }
)(LookupViewComponent);