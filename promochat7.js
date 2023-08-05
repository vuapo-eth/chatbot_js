// import { React.useContext, React.useEffect, React.useRef, React.useState, createContext } from "react"

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
      style={{ backgroundColor: settings.icon_color }}
      className={`z-[10] relative w-[420px] ${is_collapsed ? "h-[86px]" : "h-[120px]"
        } translate-y-[-20px] m-[-10px] mb-[-20px] rounded-lg text-white shadow-xl`}
    >
      <div
        onClick={() => set_is_collapsed(!is_collapsed)}
        style={{ backgroundColor: settings.icon_color }}
        className="w-[40px] h-[30px] mt-[-15px] rounded-lg float-right text-center text-[24px] cursor-pointer"
      >
        {is_collapsed ? (
          <Icon className="mx-auto" />
        ) : (
          <Icon className="mx-auto" />
        )}
      </div>

      <div className="absolute top-[7px] left-0 right-0 font-bold text-center text-[22px]">
        {is_collapsed ? "" : settings.promo_text}
      </div>

      <div className="absolute top-[36px] left-0 right-0 text-center text-[16px]">
        <a className="text-white underline" href={settings.call_to_action_url}>
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
        className="cursor-pointer text-[20px] float-right absolute bottom-7 right-3"
      />
    </div>
  )
}

const RatingBox = ({ chat_id, request_id }) => {
  const [current_rating, set_current_rating] = React.useState(0)

  function rate(is_positive) {
    mongo_post(COLLECTION.RATING, [{ is_positive, chat: chat_id, request_id }])
      .then(() => {
        set_current_rating(is_positive ? 1 : -1)
      })
      .catch(display_error)
  }

  function reset_rating() {
    mongo_delete(COLLECTION.RATING, { chat: chat_id, request_id })
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
  }

  return (
    <div className="text-black/50 text-[12px] italic mt-2 text-right">
      Was this helpful?
      <Icon
        onClick={() => on_rate_clicked(true)}
        className={`cursor-pointer inline-block ml-2 text-[#0B4] ${current_rating === 1 ? "" : "opacity-50"
          }`}
      />
      <Icon
        onClick={() => on_rate_clicked(false)}
        className={`cursor-pointer inline-block ml-2 text-[#B40] ${current_rating === -1 ? "" : "opacity-50"
          }`}
      />
    </div>
  )
}

const Message = ({ is_self, text, chat_id, request_id }) => {
  const { settings } = React.useContext(ChatContext)

  return text ? (
    text.match(/^\[RECOMMENDATION:[0-9a-f]{24}\]$/) ? (
      <ProductRecommendation
        id={text.replace("[RECOMMENDATION:", "").replace("]", "")}
      />
    ) : (
      <div
        className={`z-[50] px-3 py-3 ${is_self ? "bg-[#EEE]" : ""} text-black`}
      >
        <img
          src={is_self ? "/user.svg" : settings.icon_url}
          className="bg-transparent w-[40px] h-[40px] bg-black inline-block align-top"
        />
        <div className="w-[280px] text-[16px] pt-3 pl-3 inline-block align-top translate-y-[-8px]">
          {text}
        </div>
        {request_id && !is_self ? (
          <RatingBox chat_id={chat_id} request_id={request_id} />
        ) : null}
      </div>
    )
  ) : null
}

const MarketingMessage = () => {
  const { settings, id } = React.useContext(ChatContext)

  const [email, set_email] = React.useState("")
  const [is_subscribed, set_is_subscribed] = React.useState(false)

  function sign_up() {
    mongo_post(COLLECTION.SUBSCRIBER, [{ email, chatbot: id }])
      .then(() => display_success("You were successfully subscribed!"))
      .catch(display_error)
      .then(() => set_is_subscribed(true))
  }

  return is_subscribed ? null : (
    <div className="z-[50] px-3 py-3 text-black bg-black/5 m-3 rounded-md">
      <div className="w-[280px] text-[12px] pt-3 pl-3 inline-block align-top translate-y-[-8px]">
        <div className="text-[12px] mb-2">
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
          onChange={e => set_email(e.target.value)}
        />
        <button
          style={{ maxWidth: "50px", display: "inline-block" }}
          onClick={sign_up}
          shadow
          color={"success"}
        >
          Sign up!
        </button>
      </div>
    </div>
  )
}

const RectangleWithEllipse = () => (
  <div className="">
    <div className="ellipse" />
    <div className="rectangle" />
  </div>
)

const ProductRecommendation = ({ id }) => {
  const { settings } = React.useContext(ChatContext)
  const { data: product } = useGet(COLLECTION.PRODUCT, { _id: id }, false, !id)

  return product ? (
    <div className={`z-[50] px-3 py-3 bg-[#FFF]`}>
      <Link href={product.shop_url + "/" + product.slug} className="text-black">
        <img
          src={settings.icon_url}
          className="bg-transparent w-[40px] h-[40px] bg-black inline-block align-top"
        />
        <div className="w-[280px] text-[16px] pt-3 pl-3 inline-block align-top translate-y-[-8px]">
          <div className="mb-3">
            Could <b>{product.name}</b> fit your needs?
          </div>
          <img
            src={product.images[0]}
            className="mx-auto rounded-md shadow-md max-h-[200px]"
          />
          <div className="mt-3">{product.description}</div>
          <div className="mt-3">
            <button>Starts at ${(product.min_price / 100).toFixed(2)}</button>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <div className="text-center my-10">
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
        className="absolute w-full z-[50] h-[calc(100%-150px)] pb-[30px] overflow-y-scroll"
      >
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <Message
                key={index}
                is_self={message.is_self}
                text={message.text}
                chat_id={id}
                request_id={message.request_id}
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
    <div className="p-3 absolute bottom-0 right-0 left-0 z-[15] bg-white z-[90]">
      <textarea
        value={text}
        onChange={e => set_text(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            on_submit()
          }
        }}
        className="no-scrollbar text-black bg-[#EEE] text-[12px] h-[60px] w-full p-3 overflow-y-auto overflow-x-none resize-none"
        placeholder="Type your message..."
      />
      <Icon
        onClick={on_submit}
        style={{ color: settings ? settings.icon_color : "" }}
        className="cursor-pointer text-[30px] float-right absolute bottom-9 right-8"
      />
    </div>
  )
}

const ChatWidget = ({ messages, submit }) => {
  const { is_always_open, id } = React.useContext(ChatContext)
  const [is_collapsed, set_is_collapsed] = React.useState(
    is_always_open ? false : true
  )
  const last_message =
    messages.length > 0 ? messages[messages.length - 1] : null
  const { settings } = React.useContext(ChatContext)

  if (is_collapsed && settings.icon_is_simple) {
    return (
      <div
        className="w-[110px] cursor-pointer"
        onClick={() => set_is_collapsed(false)}
      >
        <Icon fill2={settings.icon_color} />
      </div>
    )
  }

  return (
    <div
      className={`z-[9999] bg-white font-roboto w-[400px] shadow-xl mx-auto duration-500 absolute right-0 bottom-0 ${is_collapsed ? "h-[56px]" : "h-[500px]"
        }`}
    >
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
          className="cursor-pointer max-h-[78px] overflow-hidden absolute bottom-0 right-0 left-0 bg-white z-[20]"
          onClick={() => set_is_collapsed(false)}
        >
          <Message
            is_self={last_message ? last_message.is_self : false}
            text={last_message ? last_message.text : "Hi how can I help you?"}
            chat_id={id}
            request_id={undefined}
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
  const id = "6473ec4f3f5080c02f1994c0"

  const [is_responding, set_is_responding] = React.useState(false);
  const [is_open, set_is_open] = React.useState(is_always_open);
  const [messages, set_messages] = React.useState([]);
  const settings = useGetSettings(id);
  const [chat_id, set_chat_id] = React.useState(undefined);
  const [is_fullscreen, set_fullscreen] = React.useState(false);
  // const [current_message, set_current_message] = React.useState('');
  const [last_interaction_timestamp, set_last_interaction_timestamp] = React.useState(current_unix() + 999999999999);
  const [play_sound] = useSound("https://app.promochat.ai/pop.wav")

  async function fetchAndPrintStream(chat_id) {
    const data = await query_api("chat/respond", { messages, id, chat_id })
    set_last_interaction_timestamp(current_unix() + (messages[messages.length - 1].text === '' ? 9999999999999 : 0));
    add_message(data.text, false, data.request_id);
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

  function add_message(text, is_self, request_id) {
    set_messages((messages) => [
      ...messages,
      {
        text,
        is_self,
        request_id
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
    id
  };

  return (
    <div className="fixed bottom-5 right-5">
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
ReactDOM.createRoot(document.getElementById('app')).render(<Chat />);
document.getElementById('app').style.zIndex = 99999;
