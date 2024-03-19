import React, { Component } from 'react';

// Определение типов
export interface Param {
  id: number;
  name: string;
  type: 'string';
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
  onUpdateModel: (updatedModel: Model) => void;
}

interface State {
  editedModel: Model;
}

class ParamEditor extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        editedModel: { ...props.model },
      };
    }
  
    componentDidUpdate(prevProps: Props) {
      if (prevProps.model !== this.props.model) {
        this.setState({
          editedModel: { ...this.props.model },
        });
      }
    }
  
    handleParamChange = (paramId: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const { editedModel } = this.state;
      const updatedParamValues = editedModel.paramValues.map(param => {
        if (param.paramId === paramId) {
          return { ...param, value: e.target.value };
        }
        return param;
      });
      this.setState({
        editedModel: {
          ...editedModel,
          paramValues: updatedParamValues,
        },
      });
    };
  
    handleSave = () => {
      const { onUpdateModel } = this.props;
      const { editedModel } = this.state;
      onUpdateModel(editedModel);
    };
  
    getModel(): Model {
      return this.state.editedModel;
    }
  
    render() {
      const { params } = this.props;
      const { editedModel } = this.state;
  
      return (
        <div>
          {params.map(param => (
            <div key={param.id}>
              <label>{param.name}</label>
              <input
                type="text"
                value={
                  editedModel.paramValues.find(pv => pv.paramId === param.id)?.value || ''
                }
                onChange={e => this.handleParamChange(param.id, e)}
              />
            </div>
          ))}
          <button onClick={this.handleSave}>Сохранить</button>
        </div>
      );
    }
  }
  
  export default ParamEditor;