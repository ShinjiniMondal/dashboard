import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  FileText,
  User,
  Calendar,
  Plus,
  Clock,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { Conversation, ConversationMessage } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { DataBadge } from '../common/DataBadge';

interface ConversationsViewProps {
  conversations: Conversation[];
  onSendMessage: (convId: string, text: string, channel: 'sms' | 'email' | 'internal_note') => void;
  onShowToast: (msg: string) => void;
}

export const ConversationsView: React.FC<ConversationsViewProps> = ({
  conversations,
  onSendMessage,
  onShowToast
}) => {
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || '');
  const [activeChannel, setActiveChannel] = useState<'sms' | 'email' | 'internal_note'>('sms');
  const [messageInput, setMessageInput] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConv) return;

    onSendMessage(activeConv.id, messageInput.trim(), activeChannel);
    setMessageInput('');
    onShowToast(`Sent ${activeChannel.toUpperCase()} to ${activeConv.clientName}`);
  };

  return (
    <div className="page-container" style={{ paddingBottom: '0' }}>
      <div className="dashboard-header-banner" style={{ marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="dashboard-headline">Client Communications & Inbox</h1>
            <DataBadge isRealData={false} text="Demo Communications Hub" />
          </div>
          <p className="dashboard-subheadline">
            Centralized 3-pane inbox connecting roofing contractors via instant SMS, email, and internal team notes.
          </p>
        </div>
      </div>

      {/* 3-Pane Layout (Item 20) */}
      <div className="conversations-layout">
        {/* Left Pane: Conversation List */}
        <div className="conversations-left-pane">
          <div style={{ padding: '14px', borderBottom: '1px solid var(--surface-border)' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
              All Conversations ({conversations.length})
            </span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {conversations.map((conv) => {
              const isSelected = conv.id === activeConv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  style={{
                    padding: '12px 14px',
                    borderBottom: '1px solid var(--surface-border-subtle)',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'var(--brand-primary-subtle)' : '#ffffff',
                    borderLeft: isSelected ? '3px solid var(--brand-primary)' : '3px solid transparent',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{conv.company}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{conv.lastMessageTimestamp}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {conv.clientName} ({conv.market})
                  </div>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-tertiary)',
                      marginTop: '4px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {conv.lastMessageSnippet}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Pane: Active Message Thread & Composer */}
        <div className="conversations-center-pane">
          {/* Thread Header */}
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{activeConv.company}</strong>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                {activeConv.clientName} • {activeConv.phone} • {activeConv.email}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => onShowToast('Meeting scheduler link copied to clipboard')}>
                <Calendar size={13} /> Book Meeting
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeConv.messages.map((msg) => {
              const isAgent = msg.sender === 'agent';
              const isNote = msg.channel === 'internal_note';

              return (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: isAgent ? 'flex-end' : isNote ? 'center' : 'flex-start',
                    maxWidth: isNote ? '90%' : '75%'
                  }}
                >
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '3px', textAlign: isAgent ? 'right' : 'left' }}>
                    {msg.senderName} • {msg.timestamp} ({msg.channel.toUpperCase()})
                  </div>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      backgroundColor: isNote
                        ? 'var(--color-warning-bg)'
                        : isAgent
                        ? 'var(--brand-primary)'
                        : 'var(--surface-subtle)',
                      color: isNote ? 'var(--color-warning-text)' : isAgent ? '#ffffff' : 'var(--text-primary)',
                      border: isNote ? '1px solid var(--color-warning-border)' : 'none'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer */}
          <div style={{ padding: '16px', borderTop: '1px solid var(--surface-border)', backgroundColor: '#ffffff' }}>
            {/* Channel Tabs */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <button
                className={`btn btn-sm ${activeChannel === 'sms' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '3px 8px', fontSize: '11px' }}
                onClick={() => setActiveChannel('sms')}
              >
                <Phone size={12} /> SMS Message
              </button>
              <button
                className={`btn btn-sm ${activeChannel === 'email' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '3px 8px', fontSize: '11px' }}
                onClick={() => setActiveChannel('email')}
              >
                <Mail size={12} /> Email
              </button>
              <button
                className={`btn btn-sm ${activeChannel === 'internal_note' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '3px 8px', fontSize: '11px' }}
                onClick={() => setActiveChannel('internal_note')}
              >
                <FileText size={12} /> Internal Note
              </button>
            </div>

            <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder={`Type ${activeChannel === 'sms' ? 'an SMS...' : activeChannel === 'email' ? 'an email reply...' : 'an internal team note...'}`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--surface-border)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn btn-primary" title="Send Message">
                <Send size={15} />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Pane: Client Profile Card (Item 20) */}
        <div className="conversations-right-pane">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center', paddingBottom: '14px', borderBottom: '1px solid var(--surface-border)' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--brand-primary-subtle)',
                  color: 'var(--brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px auto',
                  fontWeight: '700',
                  fontSize: '16px'
                }}
              >
                {activeConv.company.slice(0, 2).toUpperCase()}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: '700' }}>{activeConv.company}</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{activeConv.clientName}</span>
            </div>

            {/* Overview Attributes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Territory:</span>
                <strong>{activeConv.market} ({activeConv.country})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Contract Package:</span>
                <span className="badge badge-blue">{activeConv.package}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Contract Value:</span>
                <strong className="tabular-nums" style={{ color: 'var(--brand-primary)' }}>
                  {formatCurrency(activeConv.dealValue)}
                </strong>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--surface-border)', paddingTop: '12px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onShowToast(`Created opportunity for ${activeConv.company}`)}
              >
                <Plus size={12} /> Create Opportunity
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onShowToast(`Follow-up task scheduled for tomorrow`)}
              >
                <Clock size={12} /> Schedule Follow-up Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
