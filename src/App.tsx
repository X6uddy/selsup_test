import React, { useRef, useState } from 'react';
import ParamEditor, { Model, Param, ParamValue } from './ParamEditor';

// Пример использования компонента
const App = () => {
  const initialParams: Param[] = [
    {
      id: 1,
      name: 'Назначение',
      type: 'string',
    },
    {
      id: 2,
      name: 'Длина',
      type: 'string',
    },
  ];

  const initialModel = {
    paramValues: [
      {
        paramId: 1,
        value: 'повседневное',
      },
      {
        paramId: 2,
        value: 'макси',
      },
    ],
  };

  const [model, setModel] = useState<Model>(initialModel);
  const editorRef = useRef<any>(null);

  const handleUpdateModel = (updatedModel: Model) => {
    setModel(updatedModel);
  };

  const handleGetModel = () => {
    if (editorRef.current) {
      const currentModel = editorRef.current.getModel();
      console.log(currentModel);
    }
  };

  return (
    <div>
      <h1>Редактор параметров</h1>
      <ParamEditor
        params={initialParams}
        model={model}
        onUpdateModel={handleUpdateModel}
        ref={editorRef}
      />
      <button onClick={handleGetModel}>Получить текущую модель</button>
    </div>
  );
};

export default App;