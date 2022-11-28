import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Todo, fetchTodos, deleteTodo } from "../actions/todos";
import { StoreState } from "../reducers";

interface AppProps {
  title: string;
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  loading: boolean;
}

class _App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    this.props.fetchTodos();
    this.setState({ loading: true });
  }
  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  componentDidUpdate(prevProps: AppProps) {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ loading: false });
    }
  }

  renderTodos(pageNum: number): JSX.Element {
    const pageOne = this.props.todos.filter((todo: Todo) => todo.id <= 10);
    return (
      <table>
        <thead>
          <tr>
            <th className="id-column">Task #</th>
            <th className="title-column">Task Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pageOne.map((todo: Todo) => (
            <tr onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
              <th>{todo.id}</th>
              <td>{todo.title}</td>
              <td>{todo.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderPagination(): JSX.Element {
    return (
      <div className="pagination">
        <button className="pagination__btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nav"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="pagination__btn">1</button>
        <button className="pagination__btn">2</button>
        <button className="pagination__btn">3</button>
        <span className="pagination__dots">...</span>
        <button className="pagination__btn">20</button>
        <button className="pagination__btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nav"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h1>{this.props.title}</h1>
        <br />
        {this.renderTodos(1)}
        {this.renderPagination()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);

// const App = (props: AppProps): JSX.Element => {
//   const [counter, setCounter] = useState(0);

//   const countUp = (): void => {
//     setCounter(counter + 1);
//   };
//   const countDown = (): void => {
//     setCounter(counter - 1);
//   };
//   return (
//     <div>
//       <h1>{props.title}</h1>
//       <br />
//       <button onClick={countUp}>+</button>
//       <p>{counter}</p>
//       <button onClick={countDown}>-</button>
//     </div>
//   );
// };

// export default App;

// import React, { Component } from "react";

// interface AppProps {
//   title?: string;
// }

// interface AppState {
//   counter: number;
// }

// export class App extends Component<AppProps, AppState> {
//   // state = { counter: 0 };
//   constructor(props: AppProps) {
//     super(props);
//     this.state = { counter: 0 };
//   }

//   countUp = (): void => {
//     this.setState({ counter: this.state.counter + 1 });
//   };
//   countDown = (): void => {
//     this.setState({ counter: this.state.counter - 1 });
//   };
//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <br />
//         <button onClick={this.countUp}>+</button>
//         <p>{this.state.counter}</p>
//         <button onClick={this.countDown}>-</button>
//       </div>
//     );
//   }
// }

// export default App;
