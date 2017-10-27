import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper, { PaperProps } from 'material-ui/Paper/Paper';
import { MenuItem } from 'material-ui/Menu';
import * as match from 'autosuggest-highlight/match';
import * as parse from 'autosuggest-highlight/parse';
import { withStyles, Theme, StyleRulesCallback } from 'material-ui/styles';

type TClasses = {
  container: React.CSSProperties;
  textField: React.CSSProperties;
  suggestion: React.CSSProperties;
  suggestionsList: React.CSSProperties;
  suggestionsContainerOpen: React.CSSProperties;
};
type TSuggestion = {
  key: string;
  caption: string;
};

const styles: StyleRulesCallback = (theme: Theme<{}>): TClasses => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
});

type TState = { value: string; suggestions: TSuggestion[]; };

class IntegrationAutosuggest extends React.Component<TProps & { classes: TStrings<TClasses> }, TState> {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  componentWillMount() {
    if (this.props.value) {
      this.setState({
        value: this.props.value.caption
      });
    }
  }

  componentWillReceiveProps(nextProps: TProps, nextState: TState) {
    if (nextProps.value && this.props.value && nextProps.value.key !== this.props.value.key) {
      this.setState({
        value: nextProps.value.caption
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={this.handleSelection}
        inputProps={{
          autoFocus: true,
          classes,
          placeholder: this.props.label,
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }

  private handleSuggestionsFetchRequested = ({ value }: { value: string; }) => {
    this.setState({
      suggestions: this.props.getItems(value),
    });
  }

  private handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  private handleChange = (event: React.FormEvent<{}>, { newValue }: Autosuggest.ChangeEvent) => {
    this.setState({
      value: newValue,
    });
  }

  private renderInput = (inputProps: Autosuggest.InputProps) => {
    const { classes, home, value, ref, ...other } = inputProps;

    return (
      <TextField
        autoFocus={home}
        className={classes.textField}
        value={value}
        inputRef={ref}
        InputProps={{
          // tslint:disable-next-line:no-any
          ...(other as any)
        }}
      />
    );
  }

  private renderSuggestion = (
    suggestion: TSuggestion,
    { query, isHighlighted }: { query: string, isHighlighted: boolean }
  ) => {
    const matches = match(suggestion.caption, query);
    const parts = parse(suggestion.caption, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={index} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
                <strong key={index} style={{ fontWeight: 500 }}>
                  {part.text}
                </strong>
              );
          })}
        </div>
      </MenuItem>
    );
  }

  // tslint:disable-next-line
  private handleSelection = (event: React.FormEvent<any>, data: Autosuggest.SuggestionSelectedEventData<TSuggestion>) => {
    this.props.onChange(data.suggestion.key);
  }

  private renderSuggestionsContainer = (options: { containerProps: PaperProps; children: React.ReactNode; }) => {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square={true}>
        {children}
      </Paper>
    );
  }

  private getSuggestionValue = (suggestion: TSuggestion) => {
    return suggestion.caption;
  }
}

type TProps = {
  label: string;
  value?: TSuggestion;
  getItems: (value: string) => TSuggestion[];
  onChange: (item: string) => void;
};

export const AutoComplete = withStyles(styles)<TProps>(IntegrationAutosuggest);