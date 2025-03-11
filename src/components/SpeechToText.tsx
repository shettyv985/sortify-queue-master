
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Clipboard, Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export const SpeechToText: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [copied, setCopied] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const { toast } = useToast();

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
        toast({
          title: "Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        });
      };
      
      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start();
        }
      };
      
      setRecognition(recognitionInstance);
    } else {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
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
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [isListening, recognition]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening && transcript) {
      setTranscript('');
    }
  };

  const copyToClipboard = () => {
    if (!transcript) return;
    
    navigator.clipboard.writeText(transcript)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied!",
          description: "Text copied to clipboard.",
        });
        
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast({
          title: "Copy Failed",
          description: "Failed to copy text to clipboard.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 transition-all duration-300 ${transcript ? 'scale-100' : 'scale-100'}`}>
      {transcript && (
        <div className="bg-white w-72 max-w-xs rounded-lg shadow-lg p-4 glass animate-scale-in border border-border">
          <p className="text-sm font-medium mb-3">Speech Recognition</p>
          <p className="text-sm text-foreground/80 mb-3 break-words max-h-32 overflow-y-auto">
            {transcript}
          </p>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 h-8"
              onClick={copyToClipboard}
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
