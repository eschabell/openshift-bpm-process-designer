JBoss BPM Process Designer on OpenShift 
===========================================
Installing the JBoss BPM Web Process Designer standalone on OpenShift was never easier!

This git repository helps you get up and running quickly with the jBPM
Migration Tooling as integrated with the Web Designer.


Running on OpenShift
----------------------

Create an account at http://openshift.redhat.com/

Create a JBoss EAP application

    rhc app create -t jbosseap-6.0 --from-code git://github.com/eschabell/openshift-bpm-process-designer.git designer

That's it, you can now checkout your application at:

    http://designer-$your_domain.rhcloud.com/designer/editor?profile=jbpm&uuid=123

Releases
---------

- v1.0 running on JBoss EAP 6.0, standalone web process designer 2.5.
