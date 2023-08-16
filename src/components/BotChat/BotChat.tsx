import s from './BotChat.module.scss';
import {MemoizedBotMessage} from '../BotMessage/BotMessage.tsx';
import {MemoizedSelfMessage} from '../SelfMessage/SelfMessage.tsx';
import axios from 'axios';
import {useEffect, useRef} from 'react';
import {decodeToCorrectJson} from '../../utils/decoder.ts';
import {formatMessageToString} from '../../utils/format-string.ts';
import {nanoid} from 'nanoid';
import SendIcon from '../UI/Icons/SendIcon.tsx';
import {Form, Input} from 'antd';
import useMessagesStore from '../../store/messages.ts';
import {scrollToBottom} from '../../utils/scroll-to-bottom.ts';

export default function BotChat() {
  const messagesContainerRef = useRef<null | HTMLDivElement>(null);
  const {messages, setNewMessage} = useMessagesStore();
  const [form] = Form.useForm();

  useEffect(() => {
    scrollToBottom(messagesContainerRef);
  }, [messages]);

  const getBotMessageData = async (newMessage: string) => {
    const response = await axios.post(
      `http://185.46.8.130/api/v1/chat/send-message`, {message: newMessage}
    );

    const result = decodeToCorrectJson(response.data);
    const stringMessage = formatMessageToString(result);

    setNewMessage({
      id: nanoid(),
      type: 'bot',
      message: stringMessage
    });
  };

  const onSendMessage = (values: { message: string }) => {
    form.resetFields();

    setNewMessage({
      id: nanoid(),
      type: 'user',
      message: values.message
    });

    getBotMessageData(values.message);
    scrollToBottom(messagesContainerRef);
  };
  
  return (
    <div className={s.wrapper}>
      <h1>Bot Chat</h1>
      <span className={s.titleCaption}>AI-based service</span>
      <div className={s.chatWrapper}>
        <div className={s.chatInner}>
          {messages.map((item) => {
            if (item.type === 'bot') {
              return <MemoizedBotMessage key={item.id} message={item.message}/>
            } else {
              return <MemoizedSelfMessage key={item.id} message={item.message}/>
            }
          })}
          {!messages.length && (
            <div className={s.noMessages}>
              <h2>No messages here</h2>
            </div>
          )}
          <div ref={messagesContainerRef}/>
        </div>
      </div>
      <div className={s.inputWrapper}>
        <Form
          onFinish={onSendMessage}
          className={s.chatInputForm}
          form={form}
        >
          <Form.Item
            name='message'
            className={s.formItem}
            rules={[{required: true, message: 'Please insert message'}]}
          >
            <Input
              size='large'
              className={s.input}
              placeholder='Start typing here...'
              style={{height: '44px'}}
              autoComplete='off'
              autoFocus
            />
          </Form.Item>
          <button
            className={s.sendButton}
            type='submit'
          >
            <SendIcon/>
          </button>
        </Form>
      </div>
    </div>
  );
}
