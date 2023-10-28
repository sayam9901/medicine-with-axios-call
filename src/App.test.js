import { render, screen } from '@testing-library/react';
import App from './App';
import Greeting from './Greeting';
describe("App component" , ()=>{
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
})
describe("Greeting Component",()=>{
  test("render the hello world" , ()=>{
    render(<Greeting/>);
    const HelloElement = screen.getByText("hello world" , {exact : false})
    expect(HelloElement).toBeInTheDocument();
  })
  test("render the hii" , ()=>{
    render(<Greeting/>);
    const HiiElement = screen.getByText("hii")
    expect(HiiElement).toBeInTheDocument();
  })
  test("render the hii2" , ()=>{
    render(<Greeting/>);
    const HiitwoElement = screen.getByText("hii2")
    expect(HiitwoElement).toBeInTheDocument();
  })
  test("render the hii3" , ()=>{
    render(<Greeting/>);
    const HiithreeElement = screen.getByText("hii3")
    expect(HiithreeElement).toBeInTheDocument();
  })
  test("render the hii4" , ()=>{
    render(<Greeting/>);
    const HiifourElement = screen.getByText("hii4")
    expect(HiifourElement).toBeInTheDocument();
  })
})




