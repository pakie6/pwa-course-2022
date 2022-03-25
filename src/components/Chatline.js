import { tab } from '@testing-library/user-event/dist/tab';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Chatline(props) {
  let text = props.text;

  const [element, setElement] = useState(text);

  function transform(text) {
    if (text.startsWith("/link")) {
      setElement(<Link to={text}>{text}</Link>);
    }
    else if (text.startsWith("/embed")) {
      const html = text.split(" ").slice(1).join(" ");
      setElement(<div dangerouslySetInnerHTML={{ __html: html }}></div>);
    }
    else if (text.startsWith("/age")) {
      // "age"
      const [, name] = text.split(" ");
      fetch("https://api.agify.io/?name=" + name)
        .then(res => res.json())
        .then(data => setElement(data.age));
    }
    else if (text.startsWith("/gender")) {
      const [, name] = text.split(" ");
      fetch("https://api.genderize.io/?name=" + name)
        .then(res => res.json())
        .then(data => setElement(data.gender));
    }
    else if (text.startsWith("/randomfact")) {
      
      fetch ("https://uselessfacts.jsph.pl/random.json?language=en"+ text)
      .then(res => res.json())
      .then(data => setElement(data.id + " => " + data.text[1].data_id));
      // {"id":"bb38f058-58d7-455c-81af-47a4643b4391",
      //"text":"The most common name in world is Mohammed.",
      //"source":"djtech.net",
      //"source_url":"http:\/\/www.djtech.net\/humor\/useless_facts.htm",
      //"language":"en",
      //"permalink":"https:\/\/uselessfacts.jsph.pl\/bb38f058-58d7-455c-81af-47a4643b4391"}
    }
      else if (text.startsWith("/nationalize")) {
        const [, name] = text.split(" ");
        fetch ("https://api.nationalize.io?name=" + name)
        .then(res => res.json())
        .then(data => setElement(data.name + " => " + data.country));
    }
  {}};
  useEffect(() => {
    transform(text);
  }, []);

  return (
    <div dangerouslySetInnerHTML={{__html : element}}></div>
  )
}

export default Chatline;