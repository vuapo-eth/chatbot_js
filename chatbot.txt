const IS_PRODUCTION = true;
const API_PATH = IS_PRODUCTION ? "https://legalbot.qame.org/api/" : "http://localhost:3000/api/";

const default_value = {
  settings: {
    name: 'Fractional Tax',
    icon_color: '#000000',
    icon_url: 'https://static.wixstatic.com/media/d5aed9_8f60f745a59a48b7bfffc0c8de3e28f1~mv2.png/v1/fill/w_128,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Favicom%20Brighter%20Special%20size.png',
    message_color: '#8888FF',
    first_message: 'Hello!',
  },
  is_fullscreen: false,
  set_fullscreen: (value) => { },
  is_simulating: false,
  simulate: () => { }
};

const ChatContext = React.createContext(default_value);

const Message = ({ is_self, children }) => {
  const { settings } = React.useContext(ChatContext);

  if (children == '') {
    return <div></div>;
  }

  function extract_id(text) {
    const regex = /according to id ([0-9a-f]{24})/g;
    const match = regex.exec(text.toLowerCase());
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  function extract_url(text) {
    const regex = /(https?:\/\/[^\s]+)/g;
    const match = regex.exec(text);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  const id = extract_id(children);
  const { data: chunk } = useGet("chunk", { _id: id }, false, id === null);
  const { data: text } = useGet("text", { _id: chunk ? chunk.text : "" }, false, chunk === undefined);
  const { data: directory } = useGet("directory", { _id: text ? text.directory : "" }, false, text === undefined)

  const directory_name = directory ? directory.name : null;
  const url = directory_name ? extract_url(directory_name) : null;
  const directory_name_without_url = directory_name ? directory_name.replace(url, "") : null;
  const directory_name_cleaned = directory_name_without_url
    ? directory_name_without_url.trim().length > 0
      ? directory_name_without_url
      : url
    : null

  return (
    <div style={{ margin: '0.5rem auto', width: '100%', textAlign: is_self ? 'right' : 'left' }}>
      <div
        style={{
          padding: '0.75rem',
          borderRadius: '0.375rem',
          display: 'inline-block',
          marginLeft: is_self ? '30px' : '0',
          marginRight: is_self ? '0' : '30px',
          backgroundColor: is_self ? settings.message_color : 'rgba(0,0,0,0.05)',
          color: is_self ? 'white' : 'black'
        }}
      >
        {children.replace(/ccording to ID ([0-9a-f]{24})/g, "ccording to the linked source")}
      </div>
      {
        directory_name_cleaned
          ? <a
            href={url}
            style={{
              fontSize: "14px",
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              display: 'block',
              marginLeft: is_self ? '30px' : '0',
              marginRight: is_self ? '0' : '30px',
              backgroundColor: "transparent",
              color: "#0088FF",
              fontWeight: "bold",
              cursor: "pointer"
            }}>&rarr; {directory_name_cleaned}</a>
          : null
      }
    </div>
  );
};

const display_error = alert;

const ChatHeader = () => {
  const { is_fullscreen, set_fullscreen, settings } = React.useContext(ChatContext);
  return (
    <div style={{ height: '50px' }}>
      <div style={{ borderRadius: '50%', width: '38px', height: '38px', display: 'inline-block', marginRight: '0.75rem', backgroundColor: settings.icon_color }}></div>
      <div style={{ verticalAlign: 'top', paddingTop: '7px', fontSize: '18px', display: 'inline-block', color: 'rgba(0,0,0,0.6)' }}>{settings.name}</div>
    </div>
  );
};

function fill_urls(text) {
  const url_regex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(url_regex);
  if (urls) {
    let result = text;
    urls.forEach((url) => {
      result = result.replace(url, `<a href="${url}" target="_blank" class="font-bold underline hover:underline">${url.split("://")[1]}</a>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: result }}></span>;
  } else {
    return text;
  }
}

const ChatInput = ({ add_message }) => {
  const { simulate, is_simulating } = React.useContext(ChatContext);

  function submit_message() {
    const input_element = document.getElementById('chat_input');
    const value = input_element.value.trim();
    input_element.value = '';
    if (value.length > 0) {
      add_message(value);
    }
  }

  function on_key_down(e) {
    if (e.key === 'Enter') {
      submit_message();
    }
  }
  return (
    <div>
      <input
        id="chat_input"
        onKeyDown={on_key_down}
        type="text"
        style={{
          border: '1px solid #CCC',
          borderRadius: '5px',
          padding: '15px 55px 15px 15px',
          width: '100%',
          backgroundColor: '#FFF',
          color: '#000'
        }}
      />
      <img src="https://legalbot.qame.org/paperplane.svg" width="40px" height="40px"
        onClick={submit_message}
        style={{
          position: 'absolute',
          right: '1.2rem',
          bottom: '1.1rem',
          fontSize: '20px',
          cursor: 'pointer'
        }} />
    </div>
  );

};

const ChatToggle = ({ set_is_open, is_open }) => {
  const { settings, count_unread } = React.useContext(ChatContext); return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
    }}
      onClick={() => set_is_open(!is_open)}>
      <div
        style={{
          backgroundColor: settings.icon_color,
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          textAlign: 'center',
          fontSize: '22px',
          paddingTop: '5px',
          cursor: 'pointer',
          position: 'absolute',
          right: '0',
          bottom: '0',
          overflow: 'hidden',
          zIndex: 99999
        }}
      >
        <img src={settings.icon_url} style={{
          width: '40px',
          height: '40px',
          margin: 'auto'
        }} />
      </div>

      {
        count_unread > 0
          ? <div
            style={{
              backgroundColor: '#FF0000',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              color: 'white',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              position: 'absolute',
              right: '-10px',
              border: "3px solid #FFFFFF",
              bottom: '30px',
              overflow: 'hidden'
            }}
          >
            {count_unread}
          </div>
          : null
      }
    </div>
  );

};

async function query_api(path, data, options) {

  const BODY_REQUESTS = ['POST', 'PUT']
  const method = options.method || 'POST';

  const is_body_request = BODY_REQUESTS.includes(method);

  return fetch(
    API_PATH
    + (path.startsWith("/") ? path.substring(1) : path)
    + (!is_body_request && data
      ? (path.includes("?") ? "&" : "?") + 'body=' + encodeURIComponent(JSON.stringify(data))
      : '')
    , {
      method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: is_body_request ? JSON.stringify(data) : undefined,
    }).then(async (response) => {
      const json = await response.json()
      if (!response.ok) {
        throw new Error(json.error)
      } else {
        return json.data
      }
    });
}

async function mongo_post(collection, documents) {
  return await query_api(collection, { documents }, { method: "POST" })
}

async function mongo_get(collection, query, multiple = true) {
  return await query_api(collection, { query, multiple: multiple }, { method: "GET" })
}


function useGet(collection, query, multiple, is_paused) {
  const [data, set_data] = React.useState(undefined);
  const [reload_index, set_reload_index] = React.useState(0);
  const reload = () => set_reload_index(reload_index + 1);
  const [is_loading, set_is_loading] = React.useState(false);

  function fetch_data() {
    if (!is_paused) {
      set_is_loading(true);
      mongo_get(collection, query, multiple)
        .then(set_data)
        .finally(() => set_is_loading(false));
    }
  }

  React.useEffect(fetch_data, [is_paused, reload_index])

  return { data, reload, is_loading };
}

function useGetOrCreate(collection, query, is_paused, new_document) {
  const get_result = useGet(collection, query, false, is_paused);
  const { data, reload, is_loading } = get_result;

  React.useEffect(() => {
    if (!is_paused && !is_loading && data === null) {
      mongo_post(collection, [new_document])
        .then(reload)
        .catch(display_error);
    }
  }, [is_loading])

  return get_result;
}

const Chat = ({
  salesbot_id,
  is_always_open = false,
  is_never_fullscreen = false,
  on_new_message,
  rect
}) => {
  const [is_responding, set_is_responding] = React.useState(false);
  const [is_simulating, set_is_simulating] = React.useState(false);
  const [is_open, set_is_open] = React.useState(is_always_open);
  const [messages, set_messages] = React.useState([]);
  const [labels, set_labels] = React.useState([]);
  const settings = default_value;
  const [is_fullscreen, set_fullscreen] = React.useState(false);
  const [current_message, set_current_message] = React.useState('');
  const [count_unread, set_count_unread] = React.useState(1);

  const [identifier, _] = React.useState(random_string(20));
  const { data: chat } = useGetOrCreate("chat", { salesbot: salesbot_id, identifier }, !is_open, {
    salesbot: salesbot_id,
    memory: {},
    identifier
  })
  const chat_id = chat ? chat._id : undefined;

  function label_last_message(label) {
    const labels_to_add = messages.length - labels.length;
    const new_labels = [...labels, ...Array(labels_to_add).fill(undefined)]
    new_labels[new_labels.length - 1] = label;
    set_labels(new_labels);
  }

  async function fetchAndPrintStream(simulate) {
    const response = await fetch(API_PATH + 'chat/' + (simulate ? "simulate" : "respond"), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: simulate ? messages.map(({ text, is_self }) => ({ text, is_self: !is_self })) : messages,
        chat_id
      })
    });

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const stream = response.body;
    const reader = stream.getReader();

    async function readStream(current_message) {
      const { value, done } = await reader.read();

      if (done) {
        set_count_unread(count_unread + 1);
        add_message(current_message, simulate);
        set_current_message('');
        return;
      }

      const new_text = new TextDecoder().decode(value);
      if (current_message.length < 40 && labels.length < messages.length && (current_message + new_text).includes("<<<")) {
        const label = (current_message + new_text).split("<<<")[0].trim().toLowerCase();
        label_last_message(label)
        await readStream("");
      } else {
        set_current_message(current_message + new_text);
        await readStream(current_message + new_text);
      }
    }

    await readStream('');
  }

  async function respond() {
    set_is_responding(true);
    await fetchAndPrintStream(false)
      .catch(display_error)
    set_is_responding(false);
  }

  async function simulate() {
    set_is_simulating(true);
    await fetchAndPrintStream(true)
      .catch(display_error);
    set_is_simulating(false);
  }

  function add_message(text, is_self) {
    set_messages([
      ...messages,
      {
        text,
        is_self
      }
    ]);
    scroll_to_bottom_of_chat_history();
  }

  React.useEffect(() => {
    if (messages.length > 0) {
      if (messages[messages.length - 1].is_self) {
        respond()
      } else {
        // simulate();
      }
    }
    if (on_new_message) {
      on_new_message();
    }
  }, [messages]);

  React.useEffect(() => {
    if (settings && messages.length === 0) {
      add_message(settings.settings.first_message, false);
    }
  }, [settings]);

  function scroll_to_bottom_of_chat_history() {
    const chat_history = document.getElementById('chat_history');
    if (chat_history) {
      chat_history.scrollTop = chat_history.scrollHeight;
    }
  }

  const toggle_fullscreen = () => set_fullscreen(!is_fullscreen && !is_never_fullscreen);

  const chat_context = {
    settings: settings.settings,
    is_fullscreen: is_never_fullscreen ? false : is_fullscreen,
    set_fullscreen: is_never_fullscreen ? (value) => set_fullscreen(false) : set_fullscreen,
    is_simulating,
    is_responding,
    simulate,
    count_unread,
    set_count_unread
  };
  return (
    <ChatContext.Provider value={chat_context}>
      {is_fullscreen && (is_open || is_always_open) ? (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '5000'
          }}
          onClick={toggle_fullscreen}
        ></div>
      ) : null}

      <div style={{ right: '2.5rem' }}>
        {!is_always_open ? <ChatToggle is_open={is_open} set_is_open={set_is_open} /> : null}
      </div>

      {(is_open || is_always_open) ? (
        <div
          class="chatbot"
          style={{
            color: 'black',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            padding: '0.5rem',
            backgroundColor: '#FFFFFF',
            zIndex: 99999,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            borderRadius: '15px',
            transition: 'all 0.5s ease-in-out',
            width: is_fullscreen ? 'auto' : '400px',
            position: 'fixed',
            top: rect.top,
            left: rect.left
          }}
        >
          <ChatHeader />
          <ChatHistory messages={messages} current_message={current_message} labels={labels} />
          <ChatInput add_message={(text) => add_message(text, true)} />
          {
            chat_id
              ? null
              : <div style={{
                backgroundColor: "rgba(0,0,0,0.7)",
                borderRadius: "15px",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
                color: "#FFFFFF",
                textAlign: "center",
                paddingTop: "300px"
              }}>
                Initiating chat, one moment ...
              </div>
          }
        </div>
      ) : null}
    </ChatContext.Provider>
  );

};

const ChatHistory = ({ messages, current_message, labels }) => {
  const { is_fullscreen, is_simulating, is_responding, set_count_unread } = React.useContext(ChatContext);

  React.useEffect(() => {
    set_count_unread(0);
  }, [messages])

  return <div
    id="chat_history"
    style={{
      marginBottom: '0.5rem',
      overflowY: 'auto',
      paddingRight: '0.5rem',
      paddingBottom: '70px',
      transition: 'all 0.5s ease-in-out',
      paddingTop: '1.25rem',
      height: is_fullscreen ? 'calc(90vh - 100px)' : '500px'
    }}
  >
    {messages.map(({ text, is_self }, index) => (
      <Message key={index} is_self={is_self} label={labels[index]}>
        {fill_urls(text)}
      </Message>
    ))}

    {current_message.length > 0 ? (
      <Message is_self={is_simulating}>{current_message}</Message>
    ) : is_responding ? (
      <p style={{ color: '#666', fontSize: '14px', margin: '0.5rem' }}>writing ...</p>
    ) : null}
  </div>
}

function random_string(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const ChatLoader = () => {
  const [is_loaded, set_is_loaded] = React.useState(false);
  const ref = React.useRef();
  const [rect, setRect] = React.useState({ top: 0, left: 0 });

  function update_rect() {
    setRect(ref.current.getBoundingClientRect());
  }

  React.useEffect(() => {
    if (is_loaded && ref.current) {
      update_rect();
      window.addEventListener('resize', update_rect)
      return () => window.removeEventListener('resize', update_rect)
    } else {
    }
  }, [ref.current, is_loaded]);


  React.useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        set_is_loaded(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [])

  const salesbot_id = "64822d16c2d9c99c1e424eb3"

  return salesbot_id
    ? <div>
      <div ref={ref} style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '400px',
        height: '700px',
        zIndex: -1
      }} class="chatbot_box">
      </div>
      {
        is_loaded
          ? <Chat
            salesbot_id={salesbot_id}
            rect={rect}
            is_always_open={false}
            is_never_fullscreen={false}
            on_new_message={(message) => { }} />
          : null
      }
    </div>
    : <div></div>
}

// ReactDOM.render(<ChatLoader />, document.getElementById('app'));
// with create root:
ReactDOM.createRoot(document.getElementById('app')).render(<ChatLoader />);
document.getElementById('app').style.zIndex = 99999;