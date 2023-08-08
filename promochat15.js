// import React from "react"

const DEFAULT_CHATBOT_SETTINGS = {
  name: 'Chatbot',
  icon_color: '#000000',
  icon_is_simple: false,
  icon_url: '/icons/ai.png',
  user_message_color: '#4400FF',
  chatbot_message_color: '#FF0044',
  first_message: [
    'Welcome! Ready to find your perfect solution?',
    "Hi there! Let's discover your new must-have!",
    'Greetings! Interested in exploring our offerings?',
    "Hey! Let's find the best match for you!",
    'Hello! Unlock exclusive deals just for you!',
    'Welcome! Need help choosing the right product?',
    'Hi! Time to elevate your experience!',
    'Hey there! Discover our top-rated services!',
    'Greetings! Let us guide you to satisfaction!',
    'Hello! Ready to enjoy our amazing products?'
  ],
  business_name: '',
  business_address: '',
  lead_url: '',
  prompt_context: `At the beginning of the chat, let the customer know you are an AI chat and have an extensive knowledge base.
    Ask the user for their name and use it occasionally when messaging.
    Always speak in [personality]. Always include the business name '[business_name] in all responses.
    When asked for contact info, respond with Sales Phone: '[sales_phone]', Support Phone: '[support_phone]', Website: '[website]'
    When asked about location, supply the business address: '[business_address]', hours of operation: '[hours_of_operation]' and Sales phone: '[sales_phone]'
    If asked about promotions, specials or sales engage the user with [promo_text] and [call_to_action]`,
  call_to_action: '',
  call_to_action_url: '',
  report_emails: [],
  personality: 1,
  promo_text: '',
  industry: '',
  is_email_marketing_enabled: false,
  email_marketing_text: `We hope you're enjoying our products / services! We have an exciting offer for you.`
}

const default_value = {
  settings: DEFAULT_CHATBOT_SETTINGS,
  is_fullscreen: false,
  set_fullscreen: (value) => { },
  last_interaction_timestamp: 9999999999999,
  set_last_interaction_timestamp: (value) => { },
  is_always_open: false,
  id: "",
};

const ChatContext = React.createContext(default_value);

const COLLECTION = {
  CHATBOT: 'chatbot',
  SUBSCRIBER: 'subscriber',
  PRODUCT: 'product',
  RATING: 'rating',
}

function useGetSettings(chatbot_id) {
  const { data: chatbot } = useGet(COLLECTION.CHATBOT, { _id: chatbot_id }, false, !chatbot_id || chatbot_id.length !== 24);
  return chatbot ? chatbot.settings : undefined;
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

  React.useEffect(fetch_data, [is_paused, reload_index]);

  return { data, reload, is_loading, is_paused };
}

function current_unix() {
  return new Date().getTime() / 1000;
}

function display_error(error) {
  console.log(error);
  alert(error);
}

const BODY_REQUESTS = ['POST', 'PUT'];

async function query_api(path, data, options = { method: "POST" }) {
  const api_path = "https://app.promochat.ai/api/";

  const method = options.method || 'POST';

  return await fetch(
    api_path +
    (path.startsWith('/') ? path.substring(1) : path) +
    (!BODY_REQUESTS.includes(method) && data
      ? (path.includes('?') ? '&' : '?') + 'body=' + encodeURIComponent(JSON.stringify(data))
      : ''),
    {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
        //   Authorization: "Bearer " + token,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: BODY_REQUESTS.includes(method) ? JSON.stringify(data) : undefined
    }
  ).then(async (response) => {
    const text = await response.text();
    if (response.status === 404) {
      throw new Error("Not found: " + path)
    }
    try {
      var json = JSON.parse(text)

      if (!response.ok) {
        throw new Error(json.error)
      } else {
        return json.data
      }
    } catch (error) {
      console.log(error);
      console.log("RESPONSE: ", text)
      throw error
    }
  });
}


export async function mongo_get(collection, query, multiple = true) {
  return await query_api(collection, { query, multiple: multiple }, { method: 'GET' });
}

const Icon = () => {
  return <div></div>
}
const Header = ({ messages, is_collapsed, set_is_collapsed }) => {
  const { settings } = React.useContext(ChatContext)

  return (
    <div
      style={{
        backgroundColor: settings.icon_color,
        zIndex: 10,
        position: 'relative',
        width: '420px',
        height: is_collapsed ? '86px' : '120px',
        transform: 'translateY(-20px)',
        margin: '-10px',
        marginBottom: '-20px',
        borderRadius: '0.5rem',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div
        onClick={() => set_is_collapsed(!is_collapsed)}
        style={{ backgroundColor: settings.icon_color, width: '40px', height: '30px', marginTop: '-15px', borderRadius: '0.5rem', float: 'right', textAlign: 'center', fontSize: '24px', cursor: 'pointer' }}
      >
        <Icon style={{ margin: "0 auto" }} />
      </div>

      <div style={{ position: 'absolute', top: '7px', left: '0', right: '0', fontWeight: 'bold', textAlign: 'center', fontSize: '22px' }}>
        {is_collapsed ? "" : settings.promo_text}
      </div>

      <div style={{ position: 'absolute', top: '36px', left: '0', right: '0', textAlign: 'center', fontSize: '16px' }}>
        <a style={{ color: 'white', textDecoration: 'underline' }} href={settings.call_to_action_url}>
          {is_collapsed ? "" : settings.call_to_action}
        </a>
      </div>

      <Icon
        onClick={() => {
          const email = window.prompt(
            "Enter your email address to send this conversation to yourself"
          )
          query_api("/chat/forward", { messages, email })
            .then(() => display_success("Email sent!"))
            .catch(display_error)
        }}
        style={{ cursor: 'pointer', fontSize: '20px', float: 'right', position: 'absolute', bottom: '7px', right: '3px' }}
      />
    </div>
  )
}


const RatingBox = ({ message_id }) => {

  const { chat_id, chatbot_id } = React.useContext(ChatContext);
  const [current_rating, set_current_rating] = React.useState(0);

  function rate(is_positive) {
    mongo_post(COLLECTION.RATING, [{ chatbot: chatbot_id, is_positive, chat: chat_id, message_id }])
      .then(() => {
        set_current_rating(is_positive ? 1 : -1)
      })
      .catch(display_error)
  }

  function reset_rating() {
    mongo_delete(COLLECTION.RATING, { chat: chat_id, message_id })
      .then(() => {
        set_current_rating(0)
      })
      .catch(display_error)
  }

  function on_rate_clicked(is_positive) {
    if (current_rating === 0) {
      rate(is_positive)
    } else if (current_rating === 1 && is_positive) {
      reset_rating()
    } else if (current_rating === -1 && !is_positive) {
      reset_rating()
    }
  } return (
    <div style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '12px', fontStyle: 'italic', marginTop: '8px', textAlign: 'right' }}>
      Was this helpful?
      <Icon
        onClick={() => on_rate_clicked(true)}
        style={{
          cursor: 'pointer',
          display: 'inline-block',
          marginLeft: '8px',
          color: '#0B4',
          opacity: current_rating === 1 ? 1 : 0.5
        }}
      />
      <Icon
        onClick={() => on_rate_clicked(false)}
        style={{
          cursor: 'pointer',
          display: 'inline-block',
          marginLeft: '8px',
          color: '#B40',
          opacity: current_rating === -1 ? 1 : 0.5
        }}
      />
    </div>
  );
}

const Message = ({ is_self, text, _id }) => {
  const { settings } = React.useContext(ChatContext)

  return text ? (
    text.match(/^\[RECOMMENDATION:[0-9a-f]{24}\]$/) ? (
      <ProductRecommendation
        id={text.replace("[RECOMMENDATION:", "").replace("]", "")}
      />
    ) : (
      <div style={{
        zIndex: 50,
        padding: '12px',
        backgroundColor: is_self ? '#EEE' : 'transparent',
        color: 'black'
      }}>
        <img
          src={"https://app.promochat.ai/" + (is_self ? "user.svg" : settings.icon_url)}
          style={{
            background: 'transparent',
            width: '40px',
            height: '40px',
            backgroundColor: 'transparent',
            display: 'inline-block',
            verticalAlign: 'top'
          }}
        />
        <div style={{
          width: '280px',
          fontSize: '16px',
          paddingTop: '12px',
          paddingLeft: '12px',
          display: 'inline-block',
          verticalAlign: 'top',
          transform: 'translateY(-8px)'
        }}>
          {text}
        </div>
        {_id && !is_self ? (
          <RatingBox message_id={_id} />
        ) : null}
      </div>
    )
  ) : null;
}


const MarketingMessage = () => {
  const { settings, chatbot_id } = useContext(ChatContext);

  const [email, set_email] = React.useState("")
  const [is_subscribed, set_is_subscribed] = React.useState(false)

  function sign_up() {
    mongo_post(COLLECTION.SUBSCRIBER, [{ email, chatbot: id }])
      .then(() => display_success("You were successfully subscribed!"))
      .catch(display_error)
      .then(() => set_is_subscribed(true))
  }
  return is_subscribed ? null : (
    <div style={{
      zIndex: 50,
      padding: '12px',
      color: 'black',
      backgroundColor: 'rgba(0, 0, 0, 0.05)', // This is an approximation of `bg-black/5`
      margin: '12px',
      borderRadius: '0.375rem' // This is a typical rounded-md radius in pixels
    }}>
      <div style={{
        fontSize: '12px',
        paddingTop: '12px',
        paddingLeft: '12px',
        display: 'inline-block',
        verticalAlign: 'top',
        transform: 'translateY(-8px)'
      }}>
        <div style={{ fontSize: '12px', marginBottom: '8px' }}>
          {settings && (settings.email_marketing_text || "").split("\n").map((item, key) => (
            <span key={key}>
              {item}
              <br />
            </span>
          ))}
        </div>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          style={{
            padding: "9px 20px",
            marginRight: "5px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#FFF",
            border: "1px solid #DDD",
            display: "inline-block",
          }}
          onChange={e => set_email(e.target.value)}
        />
        <button
          style={{
            maxWidth: '130px',
            display: 'inline-block',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#21A279',
            color: "#FFF",
            padding: "9px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            display: "inline-block",
          }}
          onClick={sign_up}
        >
          Sign up!
        </button>
      </div>
    </div>
  )

}

const RectangleWithEllipse = () => (
  <div>
    <div class="ellipse" />
    <div class="rectangle" />
  </div>
)
const ProductRecommendation = ({ id }) => {
  const { settings } = React.useContext(ChatContext)
  const { data: product } = useGet(COLLECTION.PRODUCT, { _id: id }, false, !id)

  return product ? (
    <div style={{
      zIndex: 50,
      padding: '12px',
      backgroundColor: '#FFF'
    }}>
      <Link href={product.shop_url + "/" + product.slug} style={{ color: 'black' }}>
        <img
          src={settings.icon_url}
          style={{
            background: 'transparent',
            width: '40px',
            height: '40px',
            backgroundColor: 'black',
            display: 'inline-block',
            verticalAlign: 'top'
          }}
        />
        <div style={{
          width: '280px',
          fontSize: '16px',
          paddingTop: '12px',
          paddingLeft: '12px',
          display: 'inline-block',
          verticalAlign: 'top',
          transform: 'translateY(-8px)'
        }}>
          <div style={{ marginBottom: '12px' }}>
            Could <b>{product.name}</b> fit your needs?
          </div>
          <img
            src={product.images[0]}
            style={{
              margin: 'auto',
              borderRadius: '0.375rem', // rounded-md in pixels
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Approximation of shadow-md
              maxHeight: '200px'
            }}
          />
          <div style={{ marginTop: '12px' }}>{product.description}</div>
          <div style={{ marginTop: '12px' }}>
            <button>Starts at ${(product.min_price / 100).toFixed(2)}</button>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <div style={{ textAlign: 'center', margin: '40px 0' }}>
      <Loading />
    </div>
  )
}


const Messages = ({ is_collapsed, messages }) => {
  const ref_message_container = React.useRef(null)
  const { settings, id } = React.useContext(ChatContext)

  function scroll_to_newest_message() {
    const message_container = ref_message_container.current
    if (message_container) {
      message_container.scrollTop = message_container.scrollHeight
    }
  }

  React.useEffect(scroll_to_newest_message, [messages])

  return is_collapsed ? null : (
    <div>
      <RectangleWithEllipse />
      <div
        ref={ref_message_container}
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: 50,
          height: 'calc(100% - 150px)',
          paddingBottom: '30px',
          overflowY: 'scroll'
        }}
      >
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <Message
                key={index}
                is_self={message.is_self}
                text={message.text}
                _id={message._id}
              />
              {settings.is_email_marketing_enabled && index % 3 === 0 ? (
                <MarketingMessage />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Input = ({ submit }) => {
  const [text, set_text] = React.useState("")
  const { settings } = React.useContext(ChatContext)

  function on_submit() {
    if (text.trim().length > 0) {
      submit(text.trim())
      set_text("")
    }
  }
  return (
    <div style={{
      padding: '12px',
      position: 'absolute',
      bottom: '0',
      right: '0',
      left: '0',
      zIndex: 90,
      backgroundColor: 'white'
    }}>
      <textarea
        value={text}
        onChange={e => set_text(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            on_submit()
          }
        }}
        style={{
          scrollbarWidth: 'none', // Equivalent to no-scrollbar
          color: 'black',
          backgroundColor: '#EEE',
          fontSize: '12px',
          height: '60px',
          width: '100%',
          padding: '12px',
          overflowY: 'auto',
          overflowX: 'hidden',
          resize: 'none'
        }}
        placeholder="Type your message..."
      />
      <Icon
        onClick={on_submit}
        style={{
          color: settings ? settings.icon_color : "",
          fontSize: '30px',
          position: 'absolute',
          bottom: '9px',
          right: '8px',
          cursor: 'pointer'
        }}
      />
    </div>
  )

}

const ChatWidget = ({ messages, submit }) => {
  const { is_always_open } = React.useContext(ChatContext)
  const [is_collapsed, set_is_collapsed] = React.useState(
    is_always_open ? false : true
  )
  const last_message =
    messages.length > 0 ? messages[messages.length - 1] : null
  const { settings } = React.useContext(ChatContext)

  if (is_collapsed && settings.icon_is_simple) {
    return (
      <div
        style={{
          width: "110px",
          "cursor": "pointer"
        }}
        onClick={() => set_is_collapsed(false)}
      >
        <Icon fill2={settings.icon_color} />
      </div>
    )
  }

  return (
    <div style={{
      zIndex: 9999,
      backgroundColor: 'white',
      fontFamily: 'roboto',
      width: '400px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Approximation of shadow-xl
      margin: 'auto',
      transitionDuration: '500ms',
      position: 'absolute',
      right: '0',
      bottom: '0',
      height: is_collapsed ? '56px' : '500px'
    }}>

      <Header
        messages={messages}
        is_collapsed={is_collapsed}
        set_is_collapsed={set_is_collapsed}
      />
      <Messages
        is_collapsed={is_collapsed}
        key="messages"
        messages={messages}
      />
      {is_collapsed ? (
        <div
          style={{
            cursor: 'pointer',
            maxHeight: '78px',
            overflow: 'hidden',
            position: 'absolute',
            bottom: '0',
            right: '0',
            left: '0',
            backgroundColor: 'white',
            zIndex: 20
          }}
          onClick={() => set_is_collapsed(false)}
        >
          <Message
            is_self={last_message ? last_message.is_self : false}
            text={last_message ? last_message.text : "Hi how can I help you?"}
            _id={undefined}
          />
        </div>
      ) : (
        <Input submit={submit} />
      )}
    </div>
  )
}

function pick_random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function useSound(url) {
  const [audio] = React.useState(typeof Audio !== "undefined" && new Audio(url));
  const [playing, setPlaying] = React.useState(false);

  const toggle = () => setPlaying(!playing);

  React.useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  React.useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
}

const Chat = () => {
  const is_always_open = false;
  const is_never_fullscreen = false;
  const id = window.id;

  const [is_responding, set_is_responding] = React.useState(false);
  const [is_open, set_is_open] = React.useState(is_always_open);
  const [messages, set_messages] = React.useState([]);
  const settings = useGetSettings(id);
  const [chat_id, set_chat_id] = React.useState(undefined);
  const [is_fullscreen, set_fullscreen] = React.useState(false);
  // const [current_message, set_current_message] = React.useState('');
  const [last_interaction_timestamp, set_last_interaction_timestamp] = React.useState(current_unix() + 999999999999);
  const [playing, play_sound] = useSound("https://app.promochat.ai/pop.wav")

  async function fetchAndPrintStream(chat_id) {
    const data = await query_api("chat/respond", { messages, id, chat_id })
    set_last_interaction_timestamp(current_unix() + (messages[messages.length - 1].text === '' ? 9999999999999 : 0));
    add_message(data.text, false, data.message_id);
    play_sound();
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (current_unix() - last_interaction_timestamp > 60) {
        add_message('', true);
        set_last_interaction_timestamp(current_unix() + 999999999999);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [last_interaction_timestamp]);

  async function respond() {
    let new_chat_id;
    if (!chat_id) {
      new_chat_id = await query_api('chat/create', { chatbot_id: id });
      set_chat_id(new_chat_id);
    }

    await fetchAndPrintStream(chat_id || new_chat_id).catch(display_error);
  }

  async function get_product_recommendation() {
    const text = messages[messages.length - 1].text;
    const recommendation = await query_api('products/find', { text, chatbot: id });
    if (recommendation && recommendation.score < 0.5) {
      add_message("[RECOMMENDATION:" + recommendation._id + "]", false);
    }
  }

  function add_message(text, is_self, _id) {
    set_messages((messages) => [
      ...messages,
      {
        text,
        is_self,
        _id
      }
    ]);
    scroll_to_bottom_of_chat_history();
  }

  React.useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].is_self) {
      if (Math.ceil(messages.length) / 2 === 3) {
        if (!is_never_fullscreen) {
          set_fullscreen(true);
        }
      }
      set_is_responding(true);
      respond().finally(() => set_is_responding(false));
      get_product_recommendation();
    }
  }, [messages]);

  React.useEffect(() => {
    if (settings && messages.length === 0) {
      add_message(pick_random(settings.first_message || []), false);
    }
  }, [settings]);

  function scroll_to_bottom_of_chat_history() {
    const chat_history = document.getElementById('chat_history');
    if (chat_history) {
      chat_history.scrollTop = chat_history.scrollHeight;
    }
  }

  const toggle_fullscreen = () => set_fullscreen(!is_fullscreen && !is_never_fullscreen);

  if (!settings) {
    return <div>Loading ...</div>;
  }

  const chat_context = {
    settings,
    is_fullscreen: is_never_fullscreen ? false : is_fullscreen,
    set_fullscreen: is_never_fullscreen ? (value) => set_fullscreen(false) : set_fullscreen,
    last_interaction_timestamp,
    set_last_interaction_timestamp,
    is_always_open,
    chatbot_id: id,
    chat_id
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px'
    }}>

      <ChatContext.Provider value={chat_context}>
        <ChatWidget
          messages={messages}
          submit={(text) => add_message(text, true)}
        />
      </ChatContext.Provider>
    </div>

  );
};

// export default Chat

ReactDOM.createRoot(document.getElementById('promochat')).render(<Chat />);
document.getElementById('promochat').style.zIndex = 99999;
