import logo from './logo.svg';
import './App.css';
import React from 'react';


class App extends React.Component {
  constructor() {//呪文の言葉
    super();//呪文の言葉
    this.state = {//各変数を初期化
      todoList: [],
      value: ""
    };
  }
  onChange(keyValue) {
    this.setState(keyValue);//Stateを書き換えるonChangeちゃん
  }
  add(todoElement) { //配列をコピー
    this.setState({
      todoList: this.state.todoList.concat(todoElement),
      value: ""
    });
  }
  handleDelete(id) {//名前的に消してるのかな。消し方不明
    const { todoList } = this.state;
    const newTodoList = todoList.filter(element => element.id !== id);
    this.setState({ todoList: newTodoList });
  }
  render() {
    const { todoList } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1>ReactToDoList</h1>

        <AddTodo //AddTodo(ToDoを追加するやつ)を呼び出してる
          {...this.state} //スプレッド構文
          onChange={keyValue => this.onChange(keyValue)}
          add={todoElement => this.add(todoElement)}
        />
        <ul> 
          {todoList.map(element => (
            <TodoElement //また変数呼び出してるね
              key={element.id}
              element={element}
              onDelete={id => this.handleDelete(id)}
              {...this.state}
            />
          ))}
        </ul>
        </header>
      </div>
    );
  }
}

class AddTodo extends React.Component {
  onChange(e) {　 //名前的に何かを変えてるっぽいな
    const { onChange } = this.props; //飛ばされたvalueを受け取ってonChangeに代入する
    onChange({
      value: e.target.value　//valueが入ってる？？
    });
  }
  add() {
    const { value, todoList, add } = this.props;　//宣言？
    if (value) { //valueあったら
      const todoElement = {
        content: value,
        id: todoList.length + 1
      };
      add(todoElement); //？？？？？？
    }
  }
  render() {
    const { value } = this.props;
    return (
      <div>
        <input type="text" value={value} onChange={e => this.onChange(e)} />
        <button onClick={() => this.add()}>追加</button>
      </div>
    )
  }
}

class TodoElement extends React.Component {
  render() {
    const {
      element: { id },
      onDelete
    } = this.props;

    return (
      <li>
        <span>{this.props.element.content}</span>
        <button onClick={() => onDelete(id)}>削除</button>　
      </li>　//削除ボタンだね
    );
  }
}

export default App;
