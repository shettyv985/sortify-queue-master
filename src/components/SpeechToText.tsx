
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Clipboard, Check, X, Volume2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { toast } from 'sonner';

export const SpeechToText: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [copied, setCopied] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setTranscript(currentTranscript);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setError(`Error: ${event.error}. Please try again.`);
        toast.error(`Recognition Error: ${event.error}. Please try again.`);
      };
      
      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start();
        }
      };
      
      setRecognition(recognitionInstance);
    } else {
      setSupported(false);
      setError("Speech recognition is not supported in your browser.");
      toast.error("Speech recognition is not supported in your browser.");
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!recognition) return;
    
    if (isListening) {
      try {
        recognition.start();
        toast.success("Listening... Speak now");
      } catch (e) {
        console.error("Failed to start recognition", e);
      }
    } else {
      recognition.stop();
    }
  }, [isListening, recognition]);

  const toggleListening = () => {
    if (!supported) {
      toast.error("Speech recognition is not supported in your browser.");
      return;
    }
    
    setIsListening(!isListening);
    if (!isListening && transcript) {
      setTranscript('');
    }
    
    // Reset any previous errors when starting
    if (!isListening) {
      setError(null);
    }
  };

  const copyToClipboard = () => {
    if (!transcript) return;
    
    navigator.clipboard.writeText(transcript)
      .then(() => {
        setCopied(true);
        toast.success("Text copied to clipboard");
        
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast.error("Failed to copy text to clipboard");
      });
  };
  
  const clearTranscript = () => {
    setTranscript('');
  };
  
  const readAloud = () => {
    if (!transcript) return;
    
    const utterance = new SpeechSynthesisUtterance(transcript);
    window.speechSynthesis.speak(utterance);
    toast.success("Reading text aloud");
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 transition-all duration-300 ${transcript ? 'scale-100' : 'scale-100'}`}>
      {transcript && (
        <div className="bg-white w-72 max-w-xs rounded-lg shadow-lg p-4 glass animate-scale-in border border-border">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium">Speech Recognition</p>
            <div className="flex space-x-1">
              {transcript && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-7 w-7"
                    onClick={readAloud}
                    title="Read aloud"
                  >
                    <Volume2 size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-7 w-7"
                    onClick={clearTranscript}
                    title="Clear text"
                  >
                    <X size={14} />
                  </Button>
                </>
              )}
            </div>
          </div>
          <p className="text-sm text-foreground/80 mb-3 break-words max-h-32 overflow-y-auto">
            {transcript}
          </p>
          {error && (
            <p className="text-xs text-destructive mb-3">{error}</p>
          )}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 h-8"
              onClick={copyToClipboard}
              disabled={!transcript}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Clipboard size={14} />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}
      
      <Button
        onClick={toggleListening}
        size="icon"
        className={`h-12 w-12 rounded-full shadow-lg transition-all duration-300 ${
          isListening 
            ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
            : 'bg-primary hover:bg-primary/90'
        }`}
        aria-label={isListening ? "Stop listening" : "Start speech recognition"}
        disabled={!supported}
        title={supported ? (isListening ? "Stop listening" : "Start speech recognition") : "Not supported in this browser"}
      >
        {isListening ? (
          <MicOff size={20} className="text-white" />
        ) : (
          <Mic size={20} className="text-white" />
        )}
      </Button>
    </div>
  );
};
