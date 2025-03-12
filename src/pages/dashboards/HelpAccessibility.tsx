
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SpeechToText } from '@/components/SpeechToText';
import { Volume2, Mic, Eye, MessageSquareQuote, HelpCircle } from 'lucide-react';

export default function HelpAccessibility() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Help & Accessibility</h1>
      <p className="text-muted-foreground max-w-2xl">
        We're committed to making our services accessible to everyone. Use these tools to help
        navigate our system more easily.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              Speech to Text
            </CardTitle>
            <CardDescription>
              Use your voice to enter information instead of typing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Click the microphone button in the bottom-right corner of any page to start 
              dictating. Your speech will be converted to text that you can copy and paste into any form field.
            </p>
            <div className="bg-muted p-3 rounded-md text-sm">
              <p>Tips:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Speak clearly at a normal pace</li>
                <li>Use short sentences for better accuracy</li>
                <li>You can click the button again to stop listening</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              Text to Speech
            </CardTitle>
            <CardDescription>
              Have text read aloud to you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              When using the Speech to Text feature, you can click the speaker icon to have 
              your dictated text read back to you. This helps verify that your speech was 
              correctly transcribed.
            </p>
            <div className="bg-muted p-3 rounded-md text-sm">
              <p>Coming soon:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Page content reading</li>
                <li>Customizable reading speed</li>
                <li>Multiple language support</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Common questions and answers about using our system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">How do I check my queue position?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your queue position is shown in the Queue Position section of the dashboard. 
                  Click on "Queue Position" in the sidebar to see more detailed information.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">What happens when it's my turn?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  When it's your turn, you'll receive a notification and be directed to the 
                  appropriate service counter or virtual meeting.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">How can I update my personal information?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Visit the Profile section in the sidebar to update your personal information, 
                  including your name and contact details.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">What if I need to leave temporarily?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your position in the queue is saved. If you logout and return, you'll still 
                  maintain your position, though you might miss notifications while away.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* The SpeechToText component is already included as a floating button */}
      <SpeechToText />
    </div>
  );
}
